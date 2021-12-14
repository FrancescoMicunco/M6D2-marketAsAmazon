CREATE TABLE IF NOT EXISTS product
(
        product_id  integer PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
        product_name varchar(50)  NOT NULL,
        product_description varchar(255)  NOT NULL,
        brand: varchar(50)  NOT NULL, 	  
        image_url varchar(255)  NOT NULL,
        price NUMERIC(10, 2)  NOT NULL,
        category varchar(50)  NOT NULL,
        created_at timestamp with time zone DEFAULT now(),
        updated_at: timestamp with time zone DEFAULT now()
)


CREATE TABLE IF NOT EXISTS reviews
(
        reviews_id  integer PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY, 
        comment varchar(255)  NOT NULL,
        rate NUMERIC(1,0)  NOT NULL,
        product_id integer REFERENCES product,
        created_at timestamp with time zone DEFAULT now(),
        updated_at: timestamp with time zone DEFAULT now()
)

CREATE TABLE IF NOT EXISTS reviews_product
(
        reviews_product_id  integer PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
        product_id integer REFERENCES product,
        reviews_id integer REFERENCES reviews,
)