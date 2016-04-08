-- Query to see the draft results, including the round, team name, and position being picked
SELECT d.*, p.player_name, p.position, t.team_name, t.manager
FROM draft_results AS d
  INNER JOIN nfl_players AS p
  ON p.nfl_player_id = d.player_id
  INNER JOIN fan_teams AS t
  ON t.fan_team_id = d.fan_team_id
ORDER BY d.pick;

-- another draft results query, with summarized results and arrays
SELECT d.round, p.position, count(t.team_name), json_object_agg(t.fan_team_id, t.team_name)
FROM draft_results AS d
  INNER JOIN nfl_players AS p
  ON p.nfl_player_id = d.player_id
  INNER JOIN fan_teams AS t
  ON t.fan_team_id = d.fan_team_id
GROUP BY d.round, p.position;
