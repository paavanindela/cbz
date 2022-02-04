
DROP VIEW IF EXISTS first_inning;
DROP VIEW IF EXISTS venue_view;
DROP VIEW IF EXISTS points_table;
DROP VIEW IF EXISTS nrr;
DROP VIEW IF EXISTS bowling_stats;
DROP VIEW IF EXISTS batting_stats;
DROP VIEW IF EXISTS worm_summary;
DROP VIEW  IF EXISTS percentage_runs;
DROP VIEW  IF EXISTS match_summary2;
DROP VIEW  IF EXISTS match_summary1;
DROP VIEW  IF EXISTS match_summary;
DROP VIEW IF EXISTS worm;
DROP VIEW  IF EXISTS batting_scorecard;
DROP VIEW  IF EXISTS total;
DROP VIEW  IF EXISTS bowling_card;
DROP VIEW  IF EXISTS match_info;
DROP VIEW  IF EXISTS playing_eleven;
DROP VIEW  IF EXISTS batting_scorecard;
DROP TABLE IF EXISTS owner;
DROP TABLE IF EXISTS player_match;
DROP TABLE IF EXISTS umpire_match;
DROP TABLE IF EXISTS ball_by_ball;
DROP TABLE IF EXISTS match;
DROP TABLE IF EXISTS team;
DROP TABLE IF EXISTS player;
DROP TABLE IF EXISTS venue;
DROP TABLE IF EXISTS umpire;


--Team id and name
CREATE TABLE   team (
    team_id INT ,
    team_name TEXT,
    Primary key(team_id)
);


--Owner
CREATE TABLE owner (
    owner_id INT,
    owner_name TEXT,
    owner_type TEXT,
    team_id INT,
    stake  INT CHECK(stake between 1 and 100),
    PRIMARY KEY(owner_id),
    FOREIGN KEY(team_id) references team on delete set null   
);

--Player information
CREATE TABLE player (
    player_id INT,
    player_name TEXT,
    dob DATE,
    batting_hand TEXT,
    bowling_skill TEXT,
    country_name TEXT,
    Primary Key(player_id)
);

--Venue information
CREATE TABLE venue (
    venue_id INT,
    venue_name TEXT,
    city_name TEXT,
    country_name TEXT,
    capacity INT,
    Primary Key(venue_id)
);

--Umpire
CREATE TABLE umpire (
    umpire_id INT,
    umpire_name TEXT,
    country_name TEXT,
    PRIMARY KEY(umpire_id)
);

--Match information
CREATE TABLE   match (
    match_id INT,
    season_year INT, 
    team1 INT,
    team2 INT,
    venue_Id INT,
    toss_winner INT,
    match_winner INT,
    toss_name TEXT CHECK(toss_name='field' or toss_name='bat'),
    win_type TEXT CHECK(win_type='wickets' or win_type='runs' or win_type IS NULL),
    man_of_match INT,
    win_margin INT,
    attendance INT, 
    PRIMARY KEY(match_id),
    FOREIGN KEY(venue_id) references venue on delete set null,
    FOREIGN KEY(team1) references team on delete set null,
    FOREIGN KEY(team2) references team on delete set null,
    FOREIGN KEY(toss_winner) references team on delete set null,
    FOREIGN KEY(match_winner) references team on delete set null,
    FOREIGN KEY(man_of_match) references player on delete set null
   
);

--Umpire of a match
CREATE TABLE umpire_match (
    umpirematch_key bigINT,
    match_id INT,
    umpire_id INT,
    role_desc TEXT CHECK(role_desc = 'Field' or role_desc = 'Third'),
    PRIMARY KEY(umpirematch_key),
    FOREIGN KEY(match_id) references match on delete set null,
    FOREIGN KEY(umpire_id) references umpire on delete set null
);

--For each match contains all players along with their role and team
CREATE TABLE   player_match (
    playermatch_key bigINT,
    match_id INT,
    player_id INT,
    role_desc TEXT CHECK(role_desc='Player' or role_desc='Keeper' or role_desc='CaptainKeeper' or role_desc='Captain'),
    team_id INT,
    PRIMARY KEY(playermatch_key),
    FOREIGN KEY(match_id) references match on delete set null,
    FOREIGN KEY(player_id) references player on delete set null,
    FOREIGN KEY(team_id) references team on delete set null
     
);

--Information for each ball
CREATE TABLE   ball_by_ball (
    match_id INT,
    innings_no INT CHECK(innings_no=1 or innings_no=2),  
    over_id INT,
    ball_id INT,
    runs_scored INT CHECK(runs_scored between 0 and 6),
    extra_runs INT,
    out_type TEXT CHECK(out_type='caught' or out_type='caught and bowled' or 
        out_type='bowled' or out_type='stumped' or out_type='retired hurt' or 
        out_type='keeper catch' or out_type='lbw'or out_type='run out' or 
        out_type='hit wicket' or out_type IS NULL),
    striker INT,
    non_striker INT,
    bowler INT,
    PRIMARY KEY(match_id, innings_no, over_id,ball_id),
    Foreign Key (match_id) references match on delete set null,
    Foreign Key(striker) references player on delete set null,
    Foreign Key(non_striker) references player on delete set null,
    Foreign Key(bowler) references player on delete set null
);

--Procedures

CREATE OR REPLACE FUNCTION umpire_count() RETURNS TRIGGER AS $ump_cnt$
   DECLARE _field INT;
   DECLARE _third INT;
   BEGIN
      select count(*) from umpire_match where umpire_match.match_id = new.match_id and role_desc = 'Field' INTO _field;
      select count(*) from umpire_match where umpire_match.match_id = new.match_id and role_desc = 'Third' INTO _third;
      IF _field > 1 and new.role_desc = 'Field' THEN
        RAISE EXCEPTION 'Cannot have more than 2 field umpire';
      END IF;
      IF _third > 0 and new.role_desc = 'Third' THEN
        RAISE EXCEPTION 'Cannot have more than 1 third umpire';
      END IF;
      return NEW;
   END;
$ump_cnt$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION stake_sum() RETURNS TRIGGER AS $stks$
   DECLARE _sums INT;
   BEGIN
      select sum(stake) from owner o where o.team_id = new.team_id INTO _sums;
      
      IF _sums + new.stake > 100 THEN
        RAISE EXCEPTION 'Sum of stakes should be less than 100';
      END IF;
      
      return new;
   END;
$stks$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION attendance() RETURNS TRIGGER AS $att$
    DECLARE _cap INT;
    BEGIN
      select capacity from venue where venue.venue_id = new.venue_id INTO _cap;
      IF _cap < new.attendance  THEN
        RAISE EXCEPTION 'Seat not available';
      END IF;
      return new;
    END;
$att$ LANGUAGE plpgsql;
 

CREATE TRIGGER check_umpcount
    BEFORE INSERT OR UPDATE ON umpire_match
    FOR EACH ROW
    EXECUTE PROCEDURE umpire_count();

CREATE TRIGGER check_stake
    BEFORE INSERT OR UPDATE ON owner
    FOR EACH ROW
    EXECUTE PROCEDURE stake_sum();

CREATE TRIGGER check_atendance
    BEFORE INSERT OR UPDATE ON match
    FOR EACH ROW
    EXECUTE PROCEDURE attendance();

DROP SEQUENCE IF EXISTS auto_venue_id;
create sequence auto_venue_id;

ALTER TABLE venue ALTER COLUMN venue_id SET DEFAULT nextval('auto_venue_id');
select setval('auto_venue_id', 119);

CREATE VIEW match_summary AS
SELECT match_id, team1, team2, team_1, team_2, venue_name, city_name, (CASE WHEN match_winner=team1 THEN team_1 ELSE team_2 END) as matchwinner, win_type, win_margin 
FROM (SELECT *, team.team_name AS team_2 FROM (SELECT *, team.team_name AS team_1 FROM team join match ON team.team_id = match.team1) 
as x JOIN team ON team.team_id = x.team2) AS y NATURAL JOIN venue ORDER BY season_year DESC;

CREATE VIEW batting_scorecard AS
-- SELECT b.match_id AS id, b.innings_no AS inning, b.striker as pid, p1.player_name as batter, (CASE WHEN out_type in ('run out', 'retired hurt') THEN NULL ELSE p2.player_name END) as bowler,
--  out_type, runs, balls, fours, sixes, ROUND((runs*100.0)/balls, 2) AS sr FROM((
SELECT match_id, innings_no, striker, runs, balls, fours, sixes, player_name FROM(
(SELECT match_id, innings_no, striker, SUM(runs_scored) as runs, COUNT(*) as balls, SUM(CASE WHEN runs_scored=4 THEN 1 ELSE 0 END) as fours, 
SUM(CASE WHEN runs_scored=6 THEN 1 ELSE 0 END) as sixes, MIN(over_id) AS minover from ball_by_ball GROUP BY (match_id, innings_no, striker)) 
AS x join player on player_id=striker) AS y order by minover;
-- , MIN(over_id) AS minover, MIN(ball_id) as minball from ball_by_ball GROUP BY (match_id, innings_no, striker) ) AS b LEFT JOIN 
-- (SELECT * FROM ball_by_ball WHERE out_type IS NOT NULL) AS x on b.match_id = x.match_id AND b.striker=x.striker JOIN player as p1 
-- on p1.player_id=b.striker LEFT JOIN player as p2 on p2.player_id = x.bowler) order by minover, minball;

CREATE VIEW total AS
SELECT bb.match_id as id, innings_no as inning, team_id, team_name, SUM(runs_scored)+SUM(extra_runs) AS total, SUM(extra_runs) AS extra, COUNT(out_type) AS wickets 
, ROUND(MAX(over_id-1+(ball_id/6.0)),2) AS over FROM ball_by_ball AS bb join player_match AS pm on striker=player_id AND pm.match_id=bb.match_id
natural join team GROUP BY (bb.match_id, inning, team_id, team_name);

CREATE VIEW bowling_card AS
select match_id,innings_no,bowler,player_name, balls, runs, wickets, over + (case when maxb>.5 then 1 else maxb end) as over from (SELECT match_id, innings_no, bowler,  COUNT(*) AS balls, SUM(runs_scored) as runs, COUNT(distinct over_id)-1 as over,MAX(over_id+0.1*ball_id)%1 as maxb, SUM(CASE WHEN out_type IS NULL 
OR out_type in ('run out','retired hurt') THEN 0 ELSE 1 END) AS wickets from ball_by_ball 
group by (match_id, innings_no, bowler)) AS x join player on bowler=player.player_id;

CREATE VIEW match_info AS
SELECT match.match_id as id, t1.team_name AS team_1, t2.team_name as team_2, season_year, venue_name, (CASE WHEN toss_winner=team1 THEN t1.team_name ELSE t2.team_name END) AS 
tosswinner, toss_name from match join team as t1 on t1.team_id = team1 join team as t2 on t2.team_id = team2 natural join venue;

CREATE VIEW playing_eleven AS
SELECT * from
((SELECT match_id, player_name AS player_name1, role_desc as role_desc1, rank() over (partition by match_id order by player_id) as rnk from match join team on team1=team_id natural join player_match natural join player) AS x natural join 
(SELECT match_id, player_name AS player_name2, role_desc as role_desc2, rank() over (partition by match_id order by player_id) as rnk from match join team on team2=team_id natural join player_match natural join player) AS y) ;

CREATE VIEW worm AS
SELECT *, SUM(runs) OVER (PARTITION BY match_id, innings_no order by ball_no ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumruns FROM(
SELECT match_id, innings_no, (over_id-1)*6+ball_id AS ball_no, SUM(extra_runs + runs_scored) as runs, count(out_type) as wickets from 
(SELECT match_id, innings_no, over_id, (CASE WHEN ball_id>6 THEN 6 ELSE ball_id END) AS ball_id, extra_runs, runs_scored, out_type FROM ball_by_ball) AS x  group by (match_id, innings_no, over_id, ball_id)) AS y order by ball_no;

CREATE VIEW match_summary1 AS
SELECT * from (
SELECT *, rank() over (partition by match_id, innings_no order by runs desc, balls, player_name) as rnk from batting_scorecard) AS x where rnk <=3 order by rnk;

CREATE VIEW match_summary2 AS
SELECT * from(
SELECT *, rank() over (partition by match_id, innings_no order by wickets desc, runs, player_name) AS rnk from bowling_card where wickets>0
) AS x where rnk<=3 order by rnk;

CREATE VIEW percentage_runs AS
SELECT match_id, innings_no, SUM(CASE WHEN runs_scored=1 THEN 1 ELSE 0 END) AS one, SUM(CASE WHEN runs_scored=2 THEN 2 ELSE 0 END) AS two, SUM(CASE WHEN runs_scored=3 THEN 3 ELSE 0 END) AS three, 
SUM(CASE WHEN runs_scored=4 THEN 4 ELSE 0 END) AS four, SUM(CASE WHEN runs_scored=5 THEN 5 ELSE 0 END) AS five, SUM(CASE WHEN runs_scored=6 THEN 6 ELSE 0 END) AS six, SUM(extra_runs) as extras 
FROM ball_by_ball GROUP BY (match_id, innings_no);

CREATE VIEW worm_summary AS
SELECT match_id, team_name1, team_name2, matchwinner, win_type, win_margin FROM(
(SELECT DISTINCT bb.match_id, team_name AS team_name1 from ball_by_ball AS bb join player_match on striker=player_id AND bb.match_id=player_match.match_id natural join team where innings_no=1) AS x natural join
(SELECT DISTINCT bb.match_id, team_name AS team_name2 from ball_by_ball AS bb join player_match on striker=player_id AND bb.match_id=player_match.match_id natural join team where innings_no=2) AS y
NATURAL JOIN match_summary );

CREATE VIEW batting_stats AS
SELECT * FROM
(SELECT striker, player_name, COUNT(*) AS matches, SUM(runs) AS runs, SUM(fours) as fours, SUM(sixes) AS sixes, MAX(runs) AS highscore, 
SUM(CASE WHEN runs>=50 THEN 1 ELSE 0 END) as fifty, ROUND((SUM(runs)*100.0)/SUM(balls),2) AS sr FROM batting_scorecard GROUP BY (striker, player_name))
AS x NATURAL JOIN (SELECT striker, ROUND((sum(runs_scored)*1.0)/count(out_type),2) AS average FROM ball_by_ball group by striker) AS y; 

CREATE VIEW bowling_stats AS
SELECT *, ROUND(runs*1.0/overs,2) AS economy FROM
(SELECT bowler, player_name, COUNT(*) AS matches,SUM(balls) AS balls, SUM(runs) AS runs, SUM(wickets) as wickets,
SUM(CASE WHEN wickets>=5 THEN 1 ELSE 0 END) as fiveWicket FROM bowling_card GROUP BY (bowler, player_name))
AS x NATURAL JOIN (SELECT bowler, SUM(CASE WHEN ball_id<7 THEN 1 ELSE 0 END)*1.0/6 AS overs FROM ball_by_ball group by (bowler)) AS y; 

CREATE VIEW nrr AS
SELECT t1.id, t1.team_name, t1.team_id, t1.total as run1, t2.total as run2, t1.over as over1, t2.over as over2   from total as t1 join total as t2 on t1.id=t2.id AND t1.inning <> t2.inning; 

CREATE VIEW points_table AS
SELECT *,  matches-nr-tie-wins AS lose, 2*wins+nr+tie AS points FROM(
SELECT season_year, team_name, COUNT(*) AS matches, SUM(CASE WHEN team_id=match_winner THEN 1 ELSE 0 END) AS wins, SUM(CASE WHEN win_type='tie' THEN 1 ELSE 0 END) AS tie, SUM(CASE WHEN win_type='nr' THEN 1 ELSE 0 END) 
AS nr,  Round(sum(run1)/sum(over1) - sum(run2)/sum(over2),2) AS netrr  FROM match join nrr on id=match_id group by (season_year, team_id, team_name)) AS x ORDER BY points desc, netrr desc;

CREATE VIEW venue_view AS
SELECT venue.venue_id, venue_name, city_name, country_name, capacity, count(*)/2 AS matches, MAX(total) AS highest, MIN(total) AS lowest, 
MAX(CASE WHEN inning=2 AND team_id = match_winner THEN total ELSE 0 END), SUM(CASE WHEN win_type='runs' THEN 1 ELSE 0 END)/2 AS battingwin,
SUM(CASE WHEN win_type='wickets' THEN 1 ELSE 0 END)/2 AS bowlingwin, SUM(CASE WHEN win_type in ('runs', 'wickets') THEN 0 ELSE 1 END)/2 AS draw   
from venue left join match on match.venue_id=venue.venue_id left join total on id=match_id group by venue.venue_id;

CREATE VIEW first_inning AS
SELECT venue_id, ROUND(SUM(total)*1.0/COUNT(*),2) AS score, season_year
from venue natural join match join total on id=match_id AND inning=1 group by (venue_id, season_year);
