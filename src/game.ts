class Game  {
    game_id: number;
    competition_id: number;
    first_competitor_id:number;
    first_name: string
    first_score: number
	second_competitor_id: number;
    second_name: string
    second_score: number;
    round: number;


  

    constructor(competition_id: number,  first_competitor_id:number, second_competitor_id: number, round:number, 
            game_id?:number,
            first_name?: string,
            first_score?: number,
            second_name?: string,
            second_score?: number)
    {

        // console.log(second_score)
        this.competition_id = competition_id;
        this.first_competitor_id = first_competitor_id;
        this.second_competitor_id = second_competitor_id;
        this.round = round;

        if(game_id) {
            this.game_id = game_id
        }
        

        if(first_name) {
            this.first_name = first_name
        }

        if(second_name) {
            this.second_name = second_name
        }

        if(first_score) {
            this.first_score = first_score

        }

        if(second_score || second_score === 0){
            this.second_score = second_score
        }    
    }

    
}

export default Game