CREATE TABLE bike_easy_thefts (
be_report_number varchar,
title	         varchar,
email	         varchar,
make	         varchar,
description	     varchar,
bike_value       varchar,
theft_location   varchar,
theft_date	     date,
theft_time	     varchar,
secured	         varchar,
secured_how	     varchar,
secured_what	 varchar,
recovered	     varchar,
found_location	 varchar,
photo	         varchar,
police_report	 varchar,
latitude	     numeric,
longitude        numeric
);


COPY bike_easy_thefts FROM '/Users/mcenac/projects/bike-easy-maps/data/bike-easy-thefts.csv' CSV;

ALTER TABLE bike_easy_thefts ADD column id serial;
ALTER TABLE bike_easy_thefts ADD COLUMN geom geometry(POINT,4326);

UPDATE bike_easy_thefts SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude),4326);
