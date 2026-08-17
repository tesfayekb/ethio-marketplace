-- U1b seed correction: admin manages users (deactivate/activate) — U1 product ruling;
-- superadmin implicit. Grants the existing 'profiles:update' permission to the
-- 'admin' role. No schema change; no new objects.
INSERT INTO public.role_permissions (role_id, permission_id, is_core)
SELECT r.id, p.id, false
FROM public.roles r
JOIN public.permissions p ON true
JOIN public.resources res ON res.id = p.resource_id
WHERE r.name = 'admin'
  AND res.name = 'profiles'
  AND p.action = 'update'
ON CONFLICT DO NOTHING;