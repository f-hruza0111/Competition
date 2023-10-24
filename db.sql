-- CREATE TABLE competition (
-- 	competition_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
-- 	competition_name varchar(100),
-- 	victory_points integer,
-- 	draw_points integer,
-- 	loss_points integer
-- );

-- CREATE TABLE competitor (
-- 	competitor_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
-- 	competitor_name varchar(100),
--	wins, ingeter DEFAULT 0
--	losses, ingeter DEFAULT 0
--	draws, ingeter DEFAULT 0
-- 	points integer DEFAULT 0,
-- 	competition_id integer,
-- 	CONSTRAINT fk_competition FOREIGN KEY(competition_id) REFERENCES competition(competition_id)
-- );

-- CREATE TABLE game (
-- 	game_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
-- 	competition_id integer,
-- 	first_competitor_id integer,
-- 	second_competitor_id integer,
-- 	first_competitor_score integer,
-- 	second_competitor_score integer,
-- 	CONSTRAINT fk_competition FOREIGN KEY(competition_id) REFERENCES competition(competition_id),
-- 	CONSTRAINT fk_first_competitor FOREIGN KEY(first_competitor_id) REFERENCES competitor(competitor_id),
-- 	CONSTRAINT fk_second_competitor FOREIGN KEY(second_competitor_id) REFERENCES competitor(competitor_id)
	
-- );

CREATE FUNCTION update_points() RETURNS trigger AS $$
    BEGIN
        
		UPDATE competitor
		SET games_played = games_played + 1
		WHERE competitor.competitor_id = OLD.first_competitor_id OR competitor.competitor_id = OLD.second_competitor_id;
		
        IF NEW.first_competitor_score > NEW.second_competitor_score THEN
           UPDATE competitor 
		   SET points = points + (SELECT victory_points FROM competition WHERE competition.competition_id = OLD.competition_id)
		   WHERE competitor_id = OLD.first_competitor_id;
		   
		   UPDATE competitor
		   SET wins = wins + 1
		   WHERE competitor_id = OLD.first_competitor_id;
		   
		   
		   UPDATE competitor 
		   SET points = points + (SELECT loss_points FROM competition WHERE competition.competition_id = OLD.competition_id) 
		   WHERE competitor_id = OLD.second_competitor_id;
		   
		   UPDATE competitor
		   SET losses = losses + 1
		   WHERE competitor_id = OLD.second_competitor_id;
		   
        ELSEIF NEW.first_competitor_score < NEW.second_competitor_score THEN
			UPDATE competitor 
		   SET points = points + (SELECT loss_points FROM competition WHERE competition.competition_id = OLD.competition_id)
		   WHERE competitor_id = OLD.first_competitor_id;
		   
		   
		   UPDATE competitor
		   SET losses = losses + 1
		   WHERE competitor_id = OLD.first_competitor_id;
		   
		   UPDATE competitor 
		   SET points = points + (SELECT victory_points FROM competition WHERE competition.competition_id = OLD.competition_id) 
		   WHERE competitor_id = OLD.second_competitor_id;
		   
		   UPDATE competitor
		   SET wins = wins + 1
		   WHERE competitor_id = OLD.second_competitor_id;
		   
       	ELSE 
	   		UPDATE competitor 
			SET points = points + (SELECT draw_points FROM competition WHERE competition.competition_id = OLD.competition_id) 
			WHERE competitor_id = OLD.first_competitor_id OR competitor_id = OLD.second_competitor_id;
			
			
			UPDATE competitor
			SET draws = draws + 1
			WHERE competitor_id = OLD.first_competitor_id OR competitor_id = OLD.second_competitor_id;
			
	 	END IF;
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_points BEFORE UPDATE ON game
    FOR EACH ROW EXECUTE FUNCTION update_points();


-- ALTER TABLE game ADD round integer