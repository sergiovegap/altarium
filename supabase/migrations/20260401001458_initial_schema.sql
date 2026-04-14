-- TIPOS ENUMERADOS
CREATE TYPE user_role_type AS ENUM ('Ministro Extraordinario', 'Monaguillo');
-- 1. Parroquias
CREATE TABLE parishes (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   name TEXT NOT NULL,
   address TEXT NOT NULL,
   photo TEXT,
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- 2. Congregaciones religiosas (catálogo global)
CREATE TABLE religious_orders (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   name TEXT NOT NULL UNIQUE
);
-- 3. Elementos litúrgicos (catálogo global)
CREATE TABLE liturgical_items (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   name TEXT NOT NULL UNIQUE,
   description TEXT,
   photo TEXT,
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- 4. Perfiles unificados
CREATE TABLE profiles (
   id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
   email TEXT NOT NULL UNIQUE,
   name TEXT NOT NULL,
   last_name TEXT NOT NULL,
   birthday DATE,
   photo TEXT,
   role user_role_type NOT NULL,
   parish_id UUID NOT NULL REFERENCES parishes(id),
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- 5. Sacerdotes
CREATE TABLE priests (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   name TEXT NOT NULL,
   last_name TEXT NOT NULL,
   religious_order_id UUID NOT NULL REFERENCES religious_orders(id),
   photo TEXT,
   parish_id UUID NOT NULL REFERENCES parishes(id),
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- 6. Misas
CREATE TABLE masses (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   day DATE NOT NULL,
   time TIMESTAMP NOT NULL,
   priest_id UUID REFERENCES priests(id),
   parish_id UUID NOT NULL REFERENCES parishes(id) ON DELETE CASCADE,
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   UNIQUE(parish_id, day, time)
);
-- 7. Elementos requeridos por misa
CREATE TABLE mass_items (
   mass_id UUID NOT NULL REFERENCES masses(id) ON DELETE CASCADE,
   item_id UUID NOT NULL REFERENCES liturgical_items(id),
   quantity INTEGER CHECK (
      quantity IS NULL
      OR quantity > 0
   ),
   PRIMARY KEY (mass_id, item_id)
);
-- 8. Monaguillos asignados a una misa
CREATE TABLE altar_boys_masses (
   mass_id UUID NOT NULL REFERENCES masses(id) ON DELETE CASCADE,
   altar_boy_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
   PRIMARY KEY (mass_id, altar_boy_id)
);
-- 9. Elementos que sabe usar cada monaguillo
CREATE TABLE altar_boy_items (
   altar_boy_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
   item_id UUID NOT NULL REFERENCES liturgical_items(id) ON DELETE CASCADE,
   PRIMARY KEY (altar_boy_id, item_id)
);
-- 10. Elementos que lleva cada monaguillo en una misa específica
CREATE TABLE altar_boy_mass_items (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   mass_id UUID NOT NULL REFERENCES masses(id) ON DELETE CASCADE,
   altar_boy_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
   item_id UUID NOT NULL REFERENCES liturgical_items(id),
   FOREIGN KEY (mass_id, item_id) REFERENCES mass_items(mass_id, item_id) ON DELETE CASCADE,
   FOREIGN KEY (mass_id, altar_boy_id) REFERENCES altar_boys_masses(mass_id, altar_boy_id) ON DELETE CASCADE
);
-- 11. Horario fijo de misas por parroquia
CREATE TABLE parish_mass_schedule (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   day DATE NOT NULL,
   time TIME NOT NULL,
   parish_id UUID NOT NULL REFERENCES parishes(id) ON DELETE CASCADE,
   priest_id UUID REFERENCES priests(id),
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   UNIQUE(parish_id, day, time)
);