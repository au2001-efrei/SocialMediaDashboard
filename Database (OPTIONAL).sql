--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

-- Started on 2020-11-22 22:45:32 CET

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
-- TOC entry 624 (class 1247 OID 16703)
-- Name: social_type; Type: TYPE; Schema: public; Owner: aurelien
--

CREATE TYPE public.social_type AS ENUM (
    'youtube',
    'twitter',
    'instagram',
    'reddit'
);


ALTER TYPE public.social_type OWNER TO aurelien;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 16724)
-- Name: accounts; Type: TABLE; Schema: public; Owner: aurelien
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    type public.social_type NOT NULL,
    profile_id character varying NOT NULL,
    access_token character varying NOT NULL,
    refresh_token character varying NOT NULL
);


ALTER TABLE public.accounts OWNER TO aurelien;

--
-- TOC entry 204 (class 1259 OID 16722)
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: aurelien
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_id_seq OWNER TO aurelien;

--
-- TOC entry 3244 (class 0 OID 0)
-- Dependencies: 204
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aurelien
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- TOC entry 203 (class 1259 OID 16713)
-- Name: users; Type: TABLE; Schema: public; Owner: aurelien
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO aurelien;

--
-- TOC entry 202 (class 1259 OID 16711)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: aurelien
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO aurelien;

--
-- TOC entry 3245 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aurelien
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3103 (class 2604 OID 16727)
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: aurelien
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- TOC entry 3102 (class 2604 OID 16716)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: aurelien
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3238 (class 0 OID 16724)
-- Dependencies: 205
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: aurelien
--

COPY public.accounts (id, user_id, type, profile_id, access_token, refresh_token) FROM stdin;
\.


--
-- TOC entry 3236 (class 0 OID 16713)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: aurelien
--

COPY public.users (id, email, password) FROM stdin;
\.


--
-- TOC entry 3246 (class 0 OID 0)
-- Dependencies: 204
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aurelien
--

SELECT pg_catalog.setval('public.accounts_id_seq', 1, false);


--
-- TOC entry 3247 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aurelien
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 3107 (class 2606 OID 16732)
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: aurelien
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- TOC entry 3105 (class 2606 OID 16721)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: aurelien
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3108 (class 2606 OID 16733)
-- Name: accounts accounts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aurelien
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2020-11-22 22:45:33 CET

--
-- PostgreSQL database dump complete
--

