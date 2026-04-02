-- Profiles
-- Ministro Extraordinario ve los perfiles de su parroquia
CREATE POLICY "profiles_select" ON profiles FOR
SELECT USING (
      id = auth.uid()
      OR (
         get_user_role() = 'Ministro Extraordinario'
         AND parish_id = get_user_parish()
      )
   );
-- Cada usuario edita solo su propio perfil
CREATE POLICY "profiles_update" ON profiles FOR
UPDATE USING (id = auth.uid());
-- Cualquier usuario autenticado puede crear su perfil al registrarse
CREATE POLICY "profiles_insert" ON profiles FOR
INSERT WITH CHECK (id = auth.uid());
-- Parishes
-- Todos los autenticados ven las parroquias (necesario para el registro)
CREATE POLICY "parishes_select" ON parishes FOR
SELECT USING (auth.uid() IS NOT NULL);
-- Priests
-- Todos en la misma parroquia ven los sacerdotes
CREATE POLICY "priests_select" ON priests FOR
SELECT USING (parish_id = get_user_parish());
-- Solo el Ministro Extraordinario gestiona sacerdotes
CREATE POLICY "priests_insert" ON priests FOR
INSERT WITH CHECK (get_user_role() = 'Ministro Extraordinario');
CREATE POLICY "priests_update" ON priests FOR
UPDATE USING (get_user_role() = 'Ministro Extraordinario');
CREATE POLICY "priests_delete" ON priests FOR DELETE USING (get_user_role() = 'Ministro Extraordinario');
-- Masses
-- Todos en la misma parroquia ven las misas
CREATE POLICY "masses_select" ON masses FOR
SELECT USING (parish_id = get_user_parish());
-- Solo el Ministro Extraordinario gestiona misas
CREATE POLICY "masses_insert" ON masses FOR
INSERT WITH CHECK (get_user_role() = 'Ministro Extraordinario');
CREATE POLICY "masses_update" ON masses FOR
UPDATE USING (get_user_role() = 'Ministro Extraordinario');
CREATE POLICY "masses_delete" ON masses FOR DELETE USING (get_user_role() = 'Ministro Extraordinario');
-- altar_boys_masses
-- Ministro Extraordinario ve todos los de su parroquia, Monaguillo solo los suyos
CREATE POLICY "altar_boys_masses_select" ON altar_boys_masses FOR
SELECT USING (
      altar_boy_id = auth.uid()
      OR get_user_role() = 'Ministro Extraordinario'
   );
-- El Monaguillo se registra a sí mismo, Ministro Extraordinario también puede asignarlo
CREATE POLICY "altar_boys_masses_insert" ON altar_boys_masses FOR
INSERT WITH CHECK (
      altar_boy_id = auth.uid()
      OR get_user_role() = 'Ministro Extraordinario'
   );
-- El Monaguillo cancela su asistencia, Ministro Extraordinario también puede modificarla
CREATE POLICY "altar_boys_masses_update" ON altar_boys_masses FOR
UPDATE USING (
      altar_boy_id = auth.uid()
      OR get_user_role() = 'Ministro Extraordinario'
   );
-- altar_boy_items
-- El Monaguillo ve sus propios elementos, Ministro Extraordinario ve los de su parroquia
CREATE POLICY "altar_boy_items_select" ON altar_boy_items FOR
SELECT USING (
      altar_boy_id = auth.uid()
      OR get_user_role() = 'Ministro Extraordinario'
   );
-- El Ministro Extraordinario o Monaguillos se asignan los elementos litúrgicos
CREATE POLICY "altar_boy_items_insert" ON altar_boy_items FOR
INSERT WITH CHECK (
      altar_boy_id = auth.uid()
      OR get_user_role() = 'Ministro Extraordinario'
   );
CREATE POLICY "altar_boy_items_delete" ON altar_boy_items FOR DELETE USING (
   altar_boy_id = auth.uid()
   OR get_user_role() = 'Ministro Extraordinario'
);
-- religious_orders: cualquier autenticado puede leer, nadie escribe desde la app
CREATE POLICY "religious_orders_select" ON religious_orders FOR
SELECT USING (auth.uid() IS NOT NULL);
-- liturgical_items: igual, catálogo global de solo lectura desde la app
CREATE POLICY "liturgical_items_select" ON liturgical_items FOR
SELECT USING (auth.uid() IS NOT NULL);