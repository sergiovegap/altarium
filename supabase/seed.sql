-- Congregaciones religiosas
INSERT INTO religious_orders (name)
VALUES ('Agustino'),
   ('Carmelita'),
   ('Diocesano'),
   ('Dominico'),
   ('Franciscano'),
   ('Jesuita'),
   ('Legionario de Cristo'),
   ('Salesiano');
-- Elementos litúrgicos
INSERT INTO liturgical_items (name, description)
VALUES (
      'Ambón',
      'Plataforma elevada situada en el presbiterio de las iglesias, utilizado en la liturgia católica y ortodoxa para la proclamación de la Palabra de Dios'
   ),
   (
      'Atril y Misal',
      'El Atril es un soporte inclinado, situado en el altar o la credencia, destinado a sostener el Misal Romano'
   ),
   (
      'Aspersorium (acetre) y Aspergillum (aspersorio)',
      'La cubeta que se usa para llevar agua bendita para rociar y el hisopo para rociar agua bendita'
   ),
   (
      'Cáliz, Purificador y Palia',
      'Sobre el Cáliz se pone el Purificador en forma cuadrada y la Palia para cubir el cáliz cuando no se esté usando'
   ),
   (
      'Campana de mano o Campanilla',
      'Campanas de altar usadas durante la consagración'
   ),
   (
      'Campana de pared',
      'Campana ubicada fuera de la Sacristía que se usa al iniciar la Misa'
   ),
   ('Crucifijo', 'Cruz procesional'),
   ('Ciriales', 'Candeleros procesionales'),
   (
      'Dones',
      'Pan y Vino, presentados durante el ofertorio'
   ),
   ('Naveta', 'Recipiente para el incienso'),
   (
      'Incensario',
      'Para el incienso durante la liturgia'
   ),
   (
      'Jarra, palangana y toalla',
      'Para el lavado de manos del sacerdote'
   ),
   (
      'Mantel del altar',
      'Un paño blanco rectangular que cubre el altar para la celebración de Misa'
   ),
   (
      'Patena',
      'Plato para sostener debajo de la barbilla de los fieles durante la comunión, evitando que caigan partículas consagradas al suelo.'
   ),
   (
      'Vinajeras',
      'Contienen el vino y el agua que se utilizan en la Misa'
   );
-- Parroquias
INSERT INTO parishes (id, name, address)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Parroquia San Juan', 'Calle 123 # 4-56'),
  ('22222222-2222-2222-2222-222222222222', 'Parroquia Santa María', 'Carrera 789 # 10-11');
-- Sacerdotes (requiere religious_order_id)
INSERT INTO priests (id, name, last_name, religious_order_id, parish_id)
VALUES 
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Raul', 'Rodríguez', 
   (SELECT id FROM religious_orders WHERE name = 'Diocesano' LIMIT 1),
   '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Javier', 'García',
   (SELECT id FROM religious_orders WHERE name = 'Franciscano' LIMIT 1),
   '11111111-1111-1111-1111-111111111111');
-- Misas (el día debe ser DATE, usamos formato ISO)
INSERT INTO masses (id, day, time, priest_id, parish_id)
VALUES 
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '2023-05-19', '08:00:00', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '2023-05-26', '12:00:00', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '2023-05-26', '13:00:00', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111'),
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', '2023-06-03', '20:00:00', NULL, '11111111-1111-1111-1111-111111111111');