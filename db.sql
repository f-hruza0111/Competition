-- CREATE TABLE competition (
-- 	competition_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
-- 	competition_name varchar(100) NOT NULL,
-- 	victory_points integer NOT NULL,
-- 	draw_points integer NOT NULL,
-- 	loss_points integer NOT NULL,
--	creator varchar(250) NOT NULL
-- );

-- CREATE TABLE competitor (
-- 	competitor_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
-- 	competitor_name varchar(100) NOT NULL,
--	games_played integer DEFAULT 0,
--	wins ingeter DEFAULT 0,
--	losses ingeter DEFAULT 0,
--	draws ingeter DEFAULT 0,
-- 	points integer DEFAULT 0,
-- 	competition_id integer,
-- 	CONSTRAINT fk_competition FOREIGN KEY(competition_id) REFERENCES competition(competition_id)
-- );

-- CREATE TABLE game (
-- 	game_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
-- 	competition_id integer NOT NULL,
-- 	first_competitor_id integer NOT NULL,
-- 	second_competitor_id integer NOT NULL,
-- 	first_competitor_score integer,
-- 	second_competitor_score integer,
--	round integer NOT NULL,
-- 	CONSTRAINT fk_competition FOREIGN KEY(competition_id) REFERENCES competition(competition_id),
-- 	CONSTRAINT fk_first_competitor FOREIGN KEY(first_competitor_id) REFERENCES competitor(competitor_id),
-- 	CONSTRAINT fk_second_competitor FOREIGN KEY(second_competitor_id) REFERENCES competitor(competitor_id)
	
-- );

CREATE OR REPLACE FUNCTION update_score() RETURNS trigger AS $$
    BEGIN
        
		IF OLD.first_competitor_score IS NULL AND OLD.second_competitor_score IS NULL THEN
			UPDATE competitor
			SET games_played = games_played + 1
			WHERE competitor.competitor_id = OLD.first_competitor_id OR competitor.competitor_id = OLD.second_competitor_id;
			
		ELSEIF OLD.first_competitor_score > OLD.second_competitor_score THEN
			UPDATE competitor
			SET wins = wins - 1,
				points = points - (SELECT victory_points FROM competition WHERE competition.competition_id = competitor.competition_id)
			WHERE competitor.competitor_id = OLD.first_competitor_id;
			
			UPDATE competitor
			SET losses = losses - 1,
				points = points - (SELECT loss_points FROM competition WHERE competition.competition_id = competitor.competition_id)
			WHERE competitor.competitor_id = OLD.second_competitor_id;
			
		ELSEIF OLD.first_competitor_score < OLD.second_competitor_score THEN
		
			UPDATE competitor
			SET wins = wins - 1,
				points = points - (SELECT victory_points FROM competition WHERE competition.competition_id = competitor.competition_id)
			WHERE competitor.competitor_id = OLD.second_competitor_id;
			
			UPDATE competitor
			SET losses = losses - 1,
				points = points - (SELECT loss_points FROM competition WHERE competition.competition_id = competitor.competition_id)
			WHERE competitor.competitor_id = OLD.first_competitor_id;
		
		ELSEIF OLD.first_competitor_score = OLD.second_competitor_score THEN
			UPDATE competitor
			SET draws = draws - 1,
				points = points - (SELECT draw_points FROM competition WHERE competition.competition_id = competitor.competition_id)
			WHERE competitor.competitor_id = OLD.first_competitor_id OR competitor.competitor_id = OLD.second_competitor_id;
		END IF;
		
		
	
		
        IF NEW.first_competitor_score > NEW.second_competitor_score THEN	
		   UPDATE competitor
		   SET wins = wins + 1,
		   		points = points + (SELECT victory_points FROM competition WHERE competition.competition_id = competitor.competition_id)
		   WHERE competitor_id = OLD.first_competitor_id;
		   
		   
		   UPDATE competitor
		   SET losses = losses + 1,
		   		points = points + (SELECT loss_points FROM competition WHERE competition.competition_id = competitor.competition_id)
		   WHERE competitor_id = OLD.second_competitor_id;
		   
        ELSEIF NEW.first_competitor_score < NEW.second_competitor_score THEN
	
		   
		   
		   UPDATE competitor
		   SET losses = losses + 1,
		   		points = points + (SELECT loss_points FROM competition WHERE competition.competition_id = competitor.competition_id)
		   WHERE competitor_id = OLD.first_competitor_id;

		   UPDATE competitor
		   SET wins = wins + 1,
		   		points = points + (SELECT victory_points FROM competition WHERE competition.competition_id = competitor.competition_id)
		   WHERE competitor_id = OLD.second_competitor_id;
		   
       	ELSE 		
			UPDATE competitor
			SET draws = draws + 1,
				points = points + (SELECT draw_points FROM competition WHERE competition.competition_id = competitor.competition_id)
			WHERE competitor_id = OLD.first_competitor_id OR competitor_id = OLD.second_competitor_id;
	 	END IF;
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;



	
	
-- CREATE TRIGGER update_score BEFORE UPDATE ON game
--     FOR EACH ROW EXECUTE FUNCTION update_score();
