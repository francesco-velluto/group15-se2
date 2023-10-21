--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-2)
-- Dumped by pg_dump version 16.0 (Debian 16.0-2)

-- Started on 2023-10-21 15:54:25 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "Office-Queue-Management-System";
--
-- TOC entry 3379 (class 1262 OID 16390)
-- Name: Office-Queue-Management-System; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Office-Queue-Management-System" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'it_IT.UTF-8';


ALTER DATABASE "Office-Queue-Management-System" OWNER TO postgres;

\connect -reuse-previous=on "dbname='Office-Queue-Management-System'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16416)
-- Name: counter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.counter (
    number integer NOT NULL
);


ALTER TABLE public.counter OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16431)
-- Name: handled; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.handled (
    counter_number integer NOT NULL,
    service_id integer NOT NULL
);


ALTER TABLE public.handled OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16392)
-- Name: service; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.service (
    id integer NOT NULL,
    tag_name character varying NOT NULL
);


ALTER TABLE public.service OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16421)
-- Name: ticket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ticket (
    number integer NOT NULL,
    status integer NOT NULL,
    service_id integer NOT NULL
);


ALTER TABLE public.ticket OWNER TO postgres;

--
-- TOC entry 3371 (class 0 OID 16416)
-- Dependencies: 216
-- Data for Name: counter; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.counter VALUES (0);
INSERT INTO public.counter VALUES (1);
INSERT INTO public.counter VALUES (2);
INSERT INTO public.counter VALUES (3);
INSERT INTO public.counter VALUES (4);
INSERT INTO public.counter VALUES (5);
INSERT INTO public.counter VALUES (6);


--
-- TOC entry 3373 (class 0 OID 16431)
-- Dependencies: 218
-- Data for Name: handled; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.handled VALUES (0, 0);
INSERT INTO public.handled VALUES (0, 1);
INSERT INTO public.handled VALUES (0, 2);
INSERT INTO public.handled VALUES (0, 3);
INSERT INTO public.handled VALUES (1, 3);
INSERT INTO public.handled VALUES (1, 4);
INSERT INTO public.handled VALUES (1, 5);
INSERT INTO public.handled VALUES (1, 6);
INSERT INTO public.handled VALUES (2, 3);
INSERT INTO public.handled VALUES (2, 7);
INSERT INTO public.handled VALUES (2, 4);
INSERT INTO public.handled VALUES (3, 0);
INSERT INTO public.handled VALUES (3, 1);
INSERT INTO public.handled VALUES (3, 2);
INSERT INTO public.handled VALUES (4, 3);
INSERT INTO public.handled VALUES (4, 4);
INSERT INTO public.handled VALUES (4, 5);
INSERT INTO public.handled VALUES (4, 6);
INSERT INTO public.handled VALUES (5, 0);
INSERT INTO public.handled VALUES (5, 7);
INSERT INTO public.handled VALUES (5, 1);
INSERT INTO public.handled VALUES (5, 2);
INSERT INTO public.handled VALUES (6, 6);
INSERT INTO public.handled VALUES (6, 0);
INSERT INTO public.handled VALUES (6, 7);
INSERT INTO public.handled VALUES (6, 3);


--
-- TOC entry 3370 (class 0 OID 16392)
-- Dependencies: 215
-- Data for Name: service; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.service VALUES (2, 'Postal Stamps');
INSERT INTO public.service VALUES (3, 'Money Orders');
INSERT INTO public.service VALUES (4, 'P.O. Box Services');
INSERT INTO public.service VALUES (5, 'Postage Supplies');
INSERT INTO public.service VALUES (6, 'Package Tracking');
INSERT INTO public.service VALUES (7, 'Registered Mail');
INSERT INTO public.service VALUES (0, 'Package Shipping');
INSERT INTO public.service VALUES (1, 'Mail Forwarding');


--
-- TOC entry 3372 (class 0 OID 16421)
-- Dependencies: 217
-- Data for Name: ticket; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ticket VALUES (0, 1, 1);
INSERT INTO public.ticket VALUES (1, 0, 1);
INSERT INTO public.ticket VALUES (2, 0, 1);
INSERT INTO public.ticket VALUES (0, 1, 2);
INSERT INTO public.ticket VALUES (1, 0, 2);
INSERT INTO public.ticket VALUES (0, 2, 3);
INSERT INTO public.ticket VALUES (1, 1, 3);
INSERT INTO public.ticket VALUES (2, 0, 3);


--
-- TOC entry 3219 (class 2606 OID 16420)
-- Name: counter counter_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.counter
    ADD CONSTRAINT counter_pk PRIMARY KEY (number);


--
-- TOC entry 3223 (class 2606 OID 16445)
-- Name: handled handled_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.handled
    ADD CONSTRAINT handled_pk PRIMARY KEY (counter_number, service_id);


--
-- TOC entry 3215 (class 2606 OID 16413)
-- Name: service service_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_pk PRIMARY KEY (id);


--
-- TOC entry 3217 (class 2606 OID 16447)
-- Name: service service_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_un UNIQUE (tag_name);


--
-- TOC entry 3221 (class 2606 OID 16430)
-- Name: ticket ticket_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_pk PRIMARY KEY (number, service_id);


--
-- TOC entry 3225 (class 2606 OID 16434)
-- Name: handled handled_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.handled
    ADD CONSTRAINT handled_fk FOREIGN KEY (counter_number) REFERENCES public.counter(number);


--
-- TOC entry 3226 (class 2606 OID 16439)
-- Name: handled handled_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.handled
    ADD CONSTRAINT handled_fk_1 FOREIGN KEY (service_id) REFERENCES public.service(id);


--
-- TOC entry 3224 (class 2606 OID 16424)
-- Name: ticket ticket_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_fk FOREIGN KEY (service_id) REFERENCES public.service(id);


-- Completed on 2023-10-21 15:54:26 CEST

--
-- PostgreSQL database dump complete
--

