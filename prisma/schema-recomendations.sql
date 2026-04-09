-- Índices recomendados para optimizar el módulo Customer

-- 1. Índice único para teléfono (ya debe existir por la validación)
CREATE UNIQUE INDEX idx_customer_phone_unique ON customer(phone);

-- 2. Índice compuesto para búsqueda y ordenamiento
CREATE INDEX idx_customer_search ON customer(first_name, last_name) WHERE deleted_at IS NULL;

-- 3. Índice para soft delete
CREATE INDEX idx_customer_deleted_at ON customer(deleted_at);

-- 4. Índices individuales para ordenamiento
CREATE INDEX idx_customer_created_at ON customer(created_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_customer_updated_at ON customer(updated_at) WHERE deleted_at IS NULL;
