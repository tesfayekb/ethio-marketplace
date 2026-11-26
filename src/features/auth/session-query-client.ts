import {
  QueryClient,
  type DefaultError,
  type DefaultedQueryObserverOptions,
  type FetchQueryOptions,
  type QueryKey,
  type QueryObserverOptions,
} from "@tanstack/react-query";

import { failureKind, isRetryable, loadFailureReader } from "@/components/shell/failure-reason";

import { endsSession, reportUnauthorised } from "./session-end";

type Retry<TError> = boolean | number | ((failureCount: number, error: TError) => boolean);

/** A query's own retry rule, read as TanStack reads it (3 in a browser, 0 on the server). */
function retries<TError>(retry: Retry<TError> | undefined, count: number, error: TError): boolean {
  if (typeof retry === "function") return retry(count, error);
  if (typeof retry === "number") return count < retry;
  if (typeof retry === "boolean") return retry;
  return count < (typeof window === "undefined" ? 0 : 3);
}

/**
 * INC-1288 — a retry can succeed only for a network or server failure; a refusal (the server said
 * no) is never asked again, whatever a query's own count says. The kind is the failure notice's
 * own reading (`failureKind`), so the background retry and the notice's Retry follow one rule.
 * The reader of door codes arrives on demand: until it has, a failure is read by what it carries
 * (a status, a TypeError); asking for it here means the next decision reads the code too.
 */
function canSucceed(error: unknown): boolean {
  void loadFailureReader();
  return isRetryable(failureKind(error).kind);
}

/**
 * F1-7d (INC-1218) — the query client: every query keeps its own retry rule (a count still bounds
 * it) except for an answer that ended the session or a refusal, which are never retried; every
 * failed query or mutation is reported to the shell. The rule wraps each query's options where the client defaults them, so a query that
 * sets its own `retry` inherits it too.
 */
class SessionQueryClient extends QueryClient {
  override defaultQueryOptions<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = never,
  >(
    options:
      | QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey, TPageParam>
      | DefaultedQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
  ): DefaultedQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey> {
    if (options._defaulted === true) return super.defaultQueryOptions(options);
    const defaulted = super.defaultQueryOptions(options);
    const own = defaulted.retry;
    return {
      ...defaulted,
      retry: (count: number, error: TError) =>
        !endsSession(error) && retries(own, count, error) && canSucceed(error),
    };
  }

  /**
   * A fetch with no retry of its own is never retried (TanStack's rule, which reads `retry` as
   * unset — and the wrapper above always sets it): the legal landing after a sign-in (INC-661's
   * SO-9) fails once and lands, never again after the session has gone.
   */
  override fetchQuery<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = never,
  >(
    options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>,
  ): Promise<TData> {
    return super.fetchQuery(options.retry === undefined ? { ...options, retry: false } : options);
  }
}

export function sessionQueryClient(): QueryClient {
  const client = new SessionQueryClient();
  client.getQueryCache().subscribe((event) => {
    if (event.type === "updated" && event.action.type === "error")
      reportUnauthorised(event.action.error);
  });
  client.getMutationCache().subscribe((event) => {
    if (event.type === "updated" && event.action.type === "error")
      reportUnauthorised(event.action.error);
  });
  return client;
}
