// GENERATED from scripts/doors/manifest.txt by `bun scripts/doors/door-types.ts`; never edited
// by hand: scripts/conformance/door-words.test.ts (DW-1) fails on any drift.

/**
 * Each browser-callable function's refusal codes besides the shared gate codes
 * (door_context's), by name, its overloads joined: its own `door_refuse` codes and those of
 * every function and trigger it reaches (the manifest's codes cell). Types only.
 */
export type DoorCodeMap = {
  readonly accept_legal:
    | "adultRequired"
    | "badLanguage"
    | "emptyList"
    | "notApplicable"
    | "notInForce";
  readonly admin_accept_category_image: "acceptNoImage" | "unknownCategory";
  readonly admin_add_category_pointer: "catchallParent" | "permissionDenied";
  readonly admin_add_legal_translation:
    | "badLanguage"
    | "badValue"
    | "factMissing"
    | "notPublished"
    | "tooLong"
    | "translationExists"
    | "unknownFact"
    | "unknownVersion";
  readonly admin_ai_features: never;
  readonly admin_ai_spend_days: "badValue";
  readonly admin_allow_listing_photo:
    | "accountDeactivated"
    | "notSignedIn"
    | "ownListing"
    | "permissionDenied"
    | "reviewGone";
  readonly admin_approve_all_entity_translations: "badLanguage" | "baseLocked" | "permissionDenied";
  readonly admin_approve_all_translations: "badLanguage" | "baseLocked" | "permissionDenied";
  readonly admin_attribute_holders: never;
  readonly admin_attribute_option_coverage: never;
  readonly admin_audit_facets: never;
  readonly admin_audit_stats: never;
  readonly admin_clear_level_override: "overrideNotFound";
  readonly admin_commit_attribute_import:
    | "badValue"
    | "baseLocked"
    | "importRunning"
    | "permissionDenied"
    | "unknownCategory"
    | "unknownEntity";
  readonly admin_commit_category_import:
    | "alreadyActive"
    | "badValue"
    | "baseLocked"
    | "catchallParent"
    | "deleteActive"
    | "deleteHasChildren"
    | "deleteHasListings"
    | "deleteSlugMismatch"
    | "importRunning"
    | "permissionDenied"
    | "reassignRequired"
    | "reassignTargetInvalid"
    | "slugTaken"
    | "unknownCategory"
    | "unknownEntity"
    | "unknownParent"
    | "unknownPointer";
  readonly admin_commit_location_import:
    | "badCoordinates"
    | "badSlug"
    | "badValue"
    | "baseLocked"
    | "crossCountry"
    | "importRunning"
    | "levelMismatch"
    | "missingCoordinates"
    | "parentInactive"
    | "parentMissing"
    | "permissionDenied"
    | "planHasRefusals"
    | "rootMustBeCountry"
    | "unknownCountry"
    | "unknownEntity";
  readonly admin_create_category: "catchallParent" | "permissionDenied" | "slugTaken";
  readonly admin_create_role: "badSlug" | "duplicateKey" | "nameRequired";
  readonly admin_delete_attribute:
    | "confirmMismatch"
    | "deleteHasDependents"
    | "deleteHasLinks"
    | "unknownAttribute";
  readonly admin_delete_category:
    | "deleteActive"
    | "deleteHasChildren"
    | "deleteHasListings"
    | "deleteSlugMismatch"
    | "permissionDenied"
    | "unknownCategory";
  readonly admin_delete_language: "badLanguage" | "baseLanguage" | "languagePublished";
  readonly admin_delete_location:
    | "badCoordinates"
    | "badSlug"
    | "crossCountry"
    | "levelMismatch"
    | "locationMissing"
    | "missingCoordinates"
    | "parentInactive"
    | "parentMissing"
    | "retireInstead"
    | "rootMustBeCountry"
    | "slugMismatch";
  readonly admin_delete_role: "hasDependents" | "systemRole" | "unknownRole";
  readonly admin_discard_legal_draft: "notDraft" | "unknownVersion";
  readonly admin_edit_listing:
    | "accountDeactivated"
    | "badValue"
    | "categoryFixed"
    | "listingNotFound"
    | "listingRemoved"
    | "notSignedIn"
    | "noteRequired"
    | "noteTooLong"
    | "nothingChanged"
    | "ownListing"
    | "permissionDenied"
    | "photoNotFound";
  readonly admin_edit_package_price:
    | "badAmount"
    | "badCreditCost"
    | "badWindow"
    | "overlappingWindow"
    | "permissionDenied"
    | "priceEnded"
    | "priceInUse"
    | "priceNotFound"
    | "unknownCategory"
    | "unknownCountry"
    | "unknownCurrency";
  readonly admin_end_package_price:
    | "badWindow"
    | "overlappingWindow"
    | "permissionDenied"
    | "priceEnded"
    | "priceNotFound";
  readonly admin_entity_translation_stats: never;
  readonly admin_error_groups: "badValue";
  readonly admin_error_occurrences: "badValue";
  readonly admin_error_stats: "badValue";
  readonly admin_export_attributes: "unknownCategory";
  readonly admin_export_categories: "unknownCategory";
  readonly admin_export_legal_acceptances: "badValue" | "unknownVersion";
  readonly admin_export_locations: "unknownCountry";
  readonly admin_export_translations: "badValue";
  readonly admin_get_category_images: never;
  readonly admin_get_role: never;
  readonly admin_get_translator_scope: never;
  readonly admin_get_user: never;
  readonly admin_import_translations:
    | "badValue"
    | "baseLocked"
    | "permissionDenied"
    | "tooManyRows"
    | "unknownKey";
  readonly admin_job_health: never;
  readonly admin_job_resume: "badValue";
  readonly admin_language_delete_preview: "badLanguage";
  readonly admin_legal_documents: never;
  readonly admin_legal_settings: never;
  readonly admin_legal_version: "unknownVersion";
  readonly admin_link_attribute:
    | "alreadyLinked"
    | "badAllowedOption"
    | "badDefault"
    | "badVisibleWhen"
    | "priceBasisDuplicate"
    | "unknownAttribute"
    | "unknownCategory";
  readonly admin_list_ai_calls: "badValue";
  readonly admin_list_attribute_categories: never;
  readonly admin_list_attributes: never;
  readonly admin_list_audit: never;
  readonly admin_list_categories: never;
  readonly admin_list_category_attribute_links: never;
  readonly admin_list_category_pointers: never;
  readonly admin_list_countries: never;
  readonly admin_list_effective_category_links: never;
  readonly admin_list_entity_translations: "badValue";
  readonly admin_list_languages: never;
  readonly admin_list_listings: "badValue";
  readonly admin_list_locations: "badValue";
  readonly admin_list_monetisation: never;
  readonly admin_list_roles: never;
  readonly admin_list_roles_detailed: never;
  readonly admin_list_translation_revisions: never;
  readonly admin_list_translations: never;
  readonly admin_list_users: never;
  readonly admin_listing_certifications: never;
  readonly admin_listing_detail: "listingNotFound";
  readonly admin_listing_photos: "listingNotFound";
  readonly admin_listing_reports: never;
  readonly admin_machine_entity_translation:
    | "badValue"
    | "baseLocked"
    | "permissionDenied"
    | "required"
    | "unknownEntity";
  readonly admin_machine_translation: "baseLocked" | "permissionDenied" | "unknownKey";
  readonly admin_mark_legal_reviewed: "badValue" | "nothingToReview";
  readonly admin_merge_attributes:
    | "mergeAcrossDependency"
    | "mergeHasHolders"
    | "mergeNoSources"
    | "mergeTargetInSources"
    | "unknownAttribute";
  readonly admin_move_category_pointer: "catchallParent" | "permissionDenied" | "unknownPointer";
  readonly admin_move_listing:
    | "accountDeactivated"
    | "badValue"
    | "enforcementOnly"
    | "illegalTransition"
    | "listingNotFound"
    | "notSignedIn"
    | "notYourListing"
    | "noteRequired"
    | "noteTooLong"
    | "ownListing"
    | "ownerDeleted"
    | "ownerOnly"
    | "permissionDenied"
    | "reviewerOnly"
    | "serviceOnly"
    | "severeRemove"
    | "severeRestore";
  readonly admin_move_location:
    | "badCoordinates"
    | "badSlug"
    | "cannotMoveCountry"
    | "crossCountry"
    | "levelMismatch"
    | "locationMissing"
    | "missingCoordinates"
    | "parentInactive"
    | "parentMissing"
    | "rootMustBeCountry";
  readonly admin_name_check_clear: "badValue";
  readonly admin_name_check_list: never;
  readonly admin_name_check_summary: never;
  readonly admin_open_report_counts: "badSize";
  readonly admin_photo_changes: never;
  readonly admin_photo_link_rows: "badSize";
  readonly admin_photo_reviews: never;
  readonly admin_preview_attribute_import: "unknownCategory";
  readonly admin_preview_category_import: "unknownCategory";
  readonly admin_preview_location_import: "unknownCountry";
  readonly admin_publish_legal_version:
    | "badValue"
    | "bothLanguages"
    | "changelogRequired"
    | "factMissing"
    | "labelRequired"
    | "notDraft"
    | "noticeTooShort"
    | "unknownFact"
    | "unknownVersion";
  readonly admin_reactivate_category: "alreadyActive" | "permissionDenied" | "unknownCategory";
  readonly admin_remove_category_pointer: "permissionDenied" | "unknownPointer";
  readonly admin_reorder_categories: "permissionDenied";
  readonly admin_reorder_locations:
    | "badCoordinates"
    | "badSlug"
    | "crossCountry"
    | "levelMismatch"
    | "missingCoordinates"
    | "notAChild"
    | "orderCountriesInProfile"
    | "parentInactive"
    | "parentMissing"
    | "rootMustBeCountry";
  readonly admin_retire_category:
    | "permissionDenied"
    | "reassignRequired"
    | "reassignTargetInvalid"
    | "unknownCategory";
  readonly admin_reveal_listing_contact: "badValue" | "listingNotFound";
  readonly admin_review_listing:
    | "badValue"
    | "enforcementOnly"
    | "illegalTransition"
    | "listingNotFound"
    | "notYourListing"
    | "noteRequired"
    | "noteTooLong"
    | "ownListing"
    | "ownerDeleted"
    | "ownerOnly"
    | "reviewerOnly"
    | "serviceOnly"
    | "severeRemove"
    | "severeRestore";
  readonly admin_review_photo_change: "changeGone" | "notSignedIn" | "permissionDenied";
  readonly admin_save_entity_translation:
    | "badValue"
    | "baseLocked"
    | "permissionDenied"
    | "unknownEntity";
  readonly admin_save_legal_draft:
    | "badLanguage"
    | "badValue"
    | "labelRequired"
    | "labelTaken"
    | "tooLong";
  readonly admin_save_level_override:
    | "badDays"
    | "badPhotos"
    | "emptyOverride"
    | "notMainCategory"
    | "unknownCountry"
    | "unknownLevel"
    | "unknownPlacement";
  readonly admin_save_listing_package:
    | "badCaps"
    | "badDays"
    | "badKey"
    | "badName"
    | "badPhotos"
    | "capsOnLevel"
    | "kindChange"
    | "perksOnReach"
    | "unknownKind"
    | "unknownPlacement";
  readonly admin_save_market_settings:
    | "badFreeAds"
    | "badLaunch"
    | "launchRequired"
    | "unknownCountry"
    | "unknownReach";
  readonly admin_save_package_price:
    | "badAmount"
    | "badCreditCost"
    | "badWindow"
    | "overlappingWindow"
    | "unknownCategory"
    | "unknownCountry"
    | "unknownCurrency"
    | "unknownPackage";
  readonly admin_save_translation: "baseLocked" | "permissionDenied" | "unknownKey";
  readonly admin_screening_facts: "listingNotFound";
  readonly admin_screening_queue: "badValue";
  readonly admin_set_account_status: "badValue" | "required" | "unknownUser";
  readonly admin_set_ai_feature: "badValue" | "overBudget" | "unknownFeature";
  readonly admin_set_attribute_link_order: "orderMismatch";
  readonly admin_set_card_attributes: "cardLimit" | "rankInherited" | "unknownLink";
  readonly admin_set_category_images: "unknownCategory";
  readonly admin_set_category_window: "badValue" | "permissionDenied" | "unknownCategory";
  readonly admin_set_country_active:
    | "badCoordinates"
    | "badCountryCode"
    | "badSlug"
    | "crossCountry"
    | "levelMismatch"
    | "missingCoordinates"
    | "parentInactive"
    | "parentMissing"
    | "rootMustBeCountry"
    | "scopedRolesExist"
    | "unknownCountry";
  readonly admin_set_country_exclusions: "permissionDenied" | "unknownCategory";
  readonly admin_set_country_root_order:
    | "badCountryCode"
    | "duplicateCategory"
    | "notARoot"
    | "unknownCountry";
  readonly admin_set_entity_translation_status:
    | "badValue"
    | "permissionDenied"
    | "unknownTranslation";
  readonly admin_set_fact_attributes: "factLimit" | "unknownLink";
  readonly admin_set_key_context: "tooLong" | "unknownKey";
  readonly admin_set_language_flags:
    | "badLanguage"
    | "catalogEmpty"
    | "notFullyApproved"
    | "pseudoLanguage";
  readonly admin_set_language_order: "badLanguage" | "emptyList";
  readonly admin_set_legal_settings: "badValue";
  readonly admin_set_listing_policy: "badValue";
  readonly admin_set_listing_tier:
    | "badDays"
    | "badValue"
    | "listingNotFound"
    | "listingRemoved"
    | "noteRequired"
    | "noteTooLong"
    | "nothingChanged"
    | "ownListing";
  readonly admin_set_location_active:
    | "badCoordinates"
    | "badSlug"
    | "crossCountry"
    | "levelMismatch"
    | "locationMissing"
    | "missingCoordinates"
    | "parentInactive"
    | "parentMissing"
    | "rootMustBeCountry";
  readonly admin_set_primary_pointer: "parentInactive" | "unknownPointer";
  readonly admin_set_role_permission:
    | "corePermission"
    | "permissionReserved"
    | "systemRole"
    | "unknownPermission"
    | "unknownRole";
  readonly admin_set_translation_status:
    | "badValue"
    | "permissionDenied"
    | "translationFlagged"
    | "unknownTranslation";
  readonly admin_set_translator_languages: "badLanguage" | "unknownUser";
  readonly admin_sync_ui_keys: "badValue";
  readonly admin_translation_stats: never;
  readonly admin_undo_attribute_import: "required" | "unknownBatch";
  readonly admin_undo_category_import:
    | "alreadyActive"
    | "badValue"
    | "baseLocked"
    | "catchallParent"
    | "deleteActive"
    | "deleteHasChildren"
    | "deleteHasListings"
    | "deleteSlugMismatch"
    | "permissionDenied"
    | "reassignRequired"
    | "reassignTargetInvalid"
    | "slugTaken"
    | "unknownBatch"
    | "unknownCategory"
    | "unknownEntity"
    | "unknownPointer";
  readonly admin_undo_import: "permissionDenied" | "required" | "unknownBatch";
  readonly admin_undo_listing_edit:
    | "accountDeactivated"
    | "badValue"
    | "categoryFixed"
    | "listingChanged"
    | "listingNotFound"
    | "listingRemoved"
    | "notSignedIn"
    | "noteRequired"
    | "noteTooLong"
    | "nothingChanged"
    | "nothingToUndo"
    | "ownListing"
    | "permissionDenied"
    | "photoNotFound"
    | "photoRemovalFinal";
  readonly admin_undo_location_import:
    | "badCoordinates"
    | "badSlug"
    | "batchAlreadyUndone"
    | "crossCountry"
    | "levelMismatch"
    | "missingCoordinates"
    | "parentInactive"
    | "parentMissing"
    | "permissionDenied"
    | "rootMustBeCountry"
    | "undoBlocked"
    | "unknownBatch";
  readonly admin_unlink_attribute: "unknownLink" | "unlinkHasDependents";
  readonly admin_update_attribute_link:
    | "badAllowedOption"
    | "badClearCell"
    | "badDefault"
    | "badVisibleWhen"
    | "unknownAttribute"
    | "unknownLink";
  readonly admin_update_category: "permissionDenied" | "unknownCategory";
  readonly admin_update_profile:
    | "aliasReserved"
    | "aliasShape"
    | "aliasTaken"
    | "nameRequired"
    | "unknownCountry"
    | "unknownUser";
  readonly admin_update_role: "systemRole" | "unknownRole";
  readonly admin_upsert_attribute:
    | "allowedTargetCircular"
    | "allowedTargetNotColinked"
    | "allowedTargetNotSelect"
    | "allowedUnknownValue"
    | "badCell"
    | "badOption"
    | "boundsTargetNotColinked"
    | "boundsTargetNotNumber"
    | "dependsCycle"
    | "dependsNotSelect"
    | "dependsSelf"
    | "dependsUnknown"
    | "duplicateKey"
    | "parentNotInParent"
    | "parentWithoutDepends"
    | "required"
    | "unknownAttribute";
  readonly admin_upsert_country:
    | "badCoordinates"
    | "badCountryCode"
    | "badCurrency"
    | "badSlug"
    | "badUnitSystem"
    | "crossCountry"
    | "levelMismatch"
    | "missingCoordinates"
    | "nameRequired"
    | "parentInactive"
    | "parentMissing"
    | "rootMustBeCountry";
  readonly admin_upsert_language: "badValue" | "nameRequired";
  readonly admin_upsert_location:
    | "badCoordinates"
    | "badLevel"
    | "badSlug"
    | "crossCountry"
    | "isoOnRegionsOnly"
    | "levelMismatch"
    | "locationMissing"
    | "missingCoordinates"
    | "nameRequired"
    | "parentInactive"
    | "parentMissing"
    | "rootMustBeCountry"
    | "unknownCountry"
    | "useMoveDoor";
  readonly admin_user_activity: never;
  readonly admin_user_legal_history: "unknownUser";
  readonly admin_warned_listings: "badSize";
  readonly assign_role: "badCountryCode" | "roleReserved" | "unknownRole" | "unknownUser";
  readonly base_languages: never;
  readonly begin_impersonation:
    | "badLength"
    | "impersonateSelf"
    | "impersonateSuperAdmin"
    | "sessionActive"
    | "unknownUser";
  readonly catalog_find_rebuild: never;
  readonly change_home_country: never;
  readonly check_seller_alias: never;
  readonly clear_seller_place: never;
  readonly copy_my_listing: "listingNotFound" | "notCopied" | "notYourListing" | "residencyUnknown";
  readonly edit_my_listing:
    | "badShape"
    | "contactInNote"
    | "directionsTooLong"
    | "draftNotEdited"
    | "inReview"
    | "listingNotEditable"
    | "listingNotFound"
    | "notEditable"
    | "notYourListing"
    | "nothingChanged"
    | "renewFirst"
    | "streetTooLong";
  readonly end_impersonation: "noActiveSession";
  readonly feed_page: never;
  readonly get_active_impersonation: never;
  readonly get_attribute_options: "attributeNotFound";
  readonly get_attribute_options_version_read: never;
  readonly get_category_tree_version: never;
  readonly get_entity_bundle: never;
  readonly get_location_tree: never;
  readonly get_location_tree_version: never;
  readonly get_my_permissions: never;
  readonly get_my_translator_languages: never;
  readonly get_open_countries: never;
  readonly get_posting_schema: "categoryInactive" | "categoryNotFound" | "categoryNotPostable";
  readonly get_ui_bundle_parts: never;
  readonly get_ui_bundle_version: never;
  readonly has_password: never;
  readonly has_permission: never;
  readonly impersonated_get_profile: "noActiveSession";
  readonly impersonated_list_listings: "noActiveSession";
  readonly legal_in_force: "notSignedIn";
  readonly legal_review_overdue: never;
  readonly legal_scheduled: "notSignedIn";
  readonly listing_contact_refusals_read: never;
  readonly listing_counts: "notSignedIn" | "notYourListing";
  readonly listing_history: "notSignedIn" | "notYourListing";
  readonly listing_viewer_state: never;
  readonly mark_sold: "illegalTransition" | "notYourListing";
  readonly move_listing_photo: "badValue" | "notYourListing" | "photoGone";
  readonly my_last_listing_private: "notSignedIn";
  readonly my_legal_history: "notSignedIn";
  readonly my_legal_status: "notSignedIn";
  readonly my_legal_version: "notSignedIn" | "notYours";
  readonly my_listing: "notSignedIn" | "notYourListing";
  readonly my_listing_certification: "notSignedIn" | "notYourListing";
  readonly my_listing_private: "notSignedIn" | "notYourListing";
  readonly my_listings: "badValue" | "notSignedIn";
  readonly my_permission_answer: never;
  readonly my_recent_categories: "notSignedIn";
  readonly my_saved_listings: "badSize" | "badValue" | "notSignedIn";
  readonly my_seller_line: "notSignedIn";
  readonly my_seller_place: "notSignedIn";
  readonly my_viewing_location: "notSignedIn";
  readonly price_unit_labels: never;
  readonly promote_options: "listingNotFound" | "listingNotPlaced" | "marketNotSet";
  readonly public_listing: never;
  readonly publish_listing: "illegalTransition" | "listingNotPlaced" | "notYourListing";
  readonly remove_listing_photo: "notYourListing" | "photoGone";
  readonly remove_own_password: "lastSignInMethod";
  readonly renew_listing: "notYourListing";
  readonly report_listing:
    | "alreadyReported"
    | "badReason"
    | "listingNotAvailable"
    | "noteTooLong"
    | "ownListing";
  readonly resume_listing:
    | "badValue"
    | "enforcementOnly"
    | "illegalTransition"
    | "listingNotFound"
    | "notPaused"
    | "notYourListing"
    | "ownListing"
    | "ownerDeleted"
    | "ownerOnly"
    | "reviewerOnly"
    | "serviceOnly"
    | "severeRemove"
    | "severeRestore";
  readonly reveal_listing_contact: "acceptanceRequired" | "listingNotAvailable";
  readonly revoke_role: "roleReserved" | "unknownRole";
  readonly save_listing: "listingNotAvailable" | "ownListing";
  readonly save_posting_identity: never;
  readonly save_seller_place: "notYourListing";
  readonly seller_feed_page: never;
  readonly set_cover_photo: "notYourListing" | "photoGone";
  readonly set_listing_level:
    | "badValue"
    | "creditsNotAvailable"
    | "enforcementOnly"
    | "illegalTransition"
    | "levelNotAvailable"
    | "listingNotFound"
    | "listingNotPlaced"
    | "lowerLevel"
    | "notLive"
    | "notOffered"
    | "notYourListing"
    | "ownListing"
    | "ownerDeleted"
    | "ownerOnly"
    | "reviewerOnly"
    | "sameLevel"
    | "seasonEnded"
    | "serviceOnly"
    | "severeRemove"
    | "severeRestore"
    | "unknownLevel";
  readonly set_listing_photos_soon: "notYourListing" | "photosSoonNotEditable";
  readonly set_listing_pin:
    | "badLatitude"
    | "badLongitude"
    | "badPrecision"
    | "badZoom"
    | "contactInNote"
    | "directionsTooLong"
    | "notYourListing"
    | "pinNotEditable"
    | "streetTooLong";
  readonly set_listing_reach:
    | "creditsNotAvailable"
    | "includedReach"
    | "listingNotPlaced"
    | "lowerReach"
    | "notLive"
    | "notOffered"
    | "notYourListing"
    | "sameReach"
    | "unknownReach";
  readonly set_listing_reserved: "badValue" | "notLive" | "notYourListing";
  readonly sold_cutoff: never;
  readonly sold_visible_days: never;
  readonly submit_listing: "badValue" | "listingNotFound" | "notADraft" | "notYourListing";
  readonly suggest_seller_aliases: never;
  readonly transition_listing:
    | "badValue"
    | "enforcementOnly"
    | "illegalTransition"
    | "listingNotFound"
    | "notYourListing"
    | "ownListing"
    | "ownerDeleted"
    | "ownerOnly"
    | "reviewerOnly"
    | "serviceOnly"
    | "severeRemove"
    | "severeRestore";
  readonly translation_scope_ok_read: never;
  readonly unsave_listing: "listingNotAvailable";
  readonly user_set_preferred_language: "languageNotPublished" | "noProfile";
  readonly user_set_viewing_location: "noProfile" | "placeNotOpen";
};
