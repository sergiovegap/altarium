-- _role_helpers.sql
CREATE OR REPLACE FUNCTION get_user_role() RETURNS TEXT AS $$
SELECT role::TEXT
FROM profiles
WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;
CREATE OR REPLACE FUNCTION get_user_parish() RETURNS UUID AS $$
SELECT parish_id
FROM profiles
WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;