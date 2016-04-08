DROP TABLE if EXISTS fan_teams, nfl_players, draft_results CASCADE;

CREATE TABLE fan_teams (
  fan_team_id SERIAL PRIMARY KEY UNIQUE,
  team_name text,
  nickname text,
  manager text,
  team_logo text,
  is_commish boolean
);

CREATE TABLE nfl_players (
  nfl_player_id SERIAL PRIMARY KEY UNIQUE,
  player_name text,
  position text,
  position_id integer,
  nfl_team text,
  uniform_num integer,
  img_url text
);

CREATE TABLE draft_results (
  year integer,
  pick integer,
  round integer,
  fan_team_id integer REFERENCES fan_teams,
  player_id integer REFERENCES nfl_players(nfl_player_id)
);

-- create table nfl_teams (
--   nfl_teams_id SERIAL PRIMARY KEY UNIQUE,
--   name varchar(255) not null,
--   stadium varchar(255),
--   division varchar(255),
--   conference varchar(255),
--   head_coach varchar(255),
--   active boolean
-- );
