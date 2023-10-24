import Game from "../game.js";






export function roundRobin(competition_id:number, competitorIDs:number[]): Game[] | undefined{

    const n = competitorIDs.length;

    switch(n){
        case 4: 
            return roundRobin4(competition_id, competitorIDs)
            
        case 5:
            return roundRobin5(competition_id, competitorIDs)
        
        case 6:
            return roundRobin6(competition_id, competitorIDs)

        case 7: 
            return roundRobin7(competition_id, competitorIDs)
        case 8:
            return roundRobin8(competition_id, competitorIDs)    
    }
}

function roundRobin4(competition_id:number, competitorIDs:number[]) : Game[] | undefined {

    const g11 = new Game(competition_id, competitorIDs[0], competitorIDs[2], 1);
    const g21 = new Game(competition_id, competitorIDs[1], competitorIDs[3], 1);

    const g12 = new Game(competition_id, competitorIDs[0], competitorIDs[3], 2);
    const g22 = new Game(competition_id, competitorIDs[2], competitorIDs[1], 2);

    const g13 = new Game(competition_id, competitorIDs[0], competitorIDs[1], 3);
    const g23 = new Game(competition_id, competitorIDs[3], competitorIDs[2], 3);


    let games : Game[] = []
    games.push(g11)
    games.push(g21)
    games.push(g12)
    games.push(g22)
    games.push(g13)
    games.push(g23)

    return games
}

function roundRobin5(competition_id:number, competitorIDs:number[]) : Game[] | undefined {

    const g11 = new Game(competition_id, competitorIDs[0], competitorIDs[3], 1);
    const g21 = new Game(competition_id, competitorIDs[1], competitorIDs[4], 1);

    const g12 = new Game(competition_id, competitorIDs[0], competitorIDs[4], 2);
    const g22 = new Game(competition_id, competitorIDs[1], competitorIDs[2], 2);

    const g13 = new Game(competition_id, competitorIDs[4], competitorIDs[2], 3);
    const g23 = new Game(competition_id, competitorIDs[3], competitorIDs[1], 3);

    const g14 = new Game(competition_id, competitorIDs[0], competitorIDs[2], 4);
    const g24 = new Game(competition_id, competitorIDs[4], competitorIDs[3], 4);

    const g15 = new Game(competition_id, competitorIDs[0], competitorIDs[1], 5);
    const g25 = new Game(competition_id, competitorIDs[2], competitorIDs[3], 5);

    let games : Game[] = []
    games.push(g11)
    games.push(g21)
    games.push(g12)
    games.push(g22)
    games.push(g13)
    games.push(g23)
    games.push(g14)
    games.push(g24)
    games.push(g15)
    games.push(g25)



    return games
}

function roundRobin6(competition_id:number, competitorIDs:number[]) : Game[] | undefined {

    const g11 = new Game(competition_id, competitorIDs[0], competitorIDs[3], 1);
    const g21 = new Game(competition_id, competitorIDs[1], competitorIDs[4], 1);
    const g31 = new Game(competition_id, competitorIDs[2], competitorIDs[5], 1);


    const g12 = new Game(competition_id, competitorIDs[0], competitorIDs[4], 2);
    const g22 = new Game(competition_id, competitorIDs[3], competitorIDs[5], 2);
    const g32 = new Game(competition_id, competitorIDs[1], competitorIDs[2], 2);


    const g13 = new Game(competition_id, competitorIDs[0], competitorIDs[5], 3);
    const g23 = new Game(competition_id, competitorIDs[4], competitorIDs[2], 3);
    const g33 = new Game(competition_id, competitorIDs[3], competitorIDs[1], 3);


    const g14 = new Game(competition_id, competitorIDs[0], competitorIDs[2], 4);
    const g24 = new Game(competition_id, competitorIDs[5], competitorIDs[1], 4);
    const g34 = new Game(competition_id, competitorIDs[4], competitorIDs[3], 4);


    const g15 = new Game(competition_id, competitorIDs[0], competitorIDs[1], 5);
    const g25 = new Game(competition_id, competitorIDs[2], competitorIDs[3], 5);
    const g35 = new Game(competition_id, competitorIDs[5], competitorIDs[4], 5);


    let games : Game[] = []
    games.push(g11)
    games.push(g21)
    games.push(g31)
    games.push(g12)
    games.push(g22)
    games.push(g32)
    games.push(g13)
    games.push(g23)
    games.push(g33)
    games.push(g14)
    games.push(g24)
    games.push(g34)
    games.push(g15)
    games.push(g25)
    games.push(g35)
    



    return games
}

function roundRobin7(competition_id:number, competitorIDs:number[]) : Game[] | undefined {

    const g11 = new Game(competition_id, competitorIDs[0], competitorIDs[5], 1);
    const g21 = new Game(competition_id, competitorIDs[1], competitorIDs[4], 1);
    const g31 = new Game(competition_id, competitorIDs[2], competitorIDs[3], 1);


    const g12 = new Game(competition_id, competitorIDs[3], competitorIDs[1], 2);
    const g22 = new Game(competition_id, competitorIDs[4], competitorIDs[0], 2);
    const g32 = new Game(competition_id, competitorIDs[5], competitorIDs[6], 2);


    const g13 = new Game(competition_id, competitorIDs[1], competitorIDs[6], 3);
    const g23 = new Game(competition_id, competitorIDs[2], competitorIDs[5], 3);
    const g33 = new Game(competition_id, competitorIDs[3], competitorIDs[4], 3);


    const g14 = new Game(competition_id, competitorIDs[4], competitorIDs[2], 4);
    const g24 = new Game(competition_id, competitorIDs[5], competitorIDs[1], 4);
    const g34 = new Game(competition_id, competitorIDs[6], competitorIDs[0], 4);


    const g15 = new Game(competition_id, competitorIDs[2], competitorIDs[0], 5);
    const g25 = new Game(competition_id, competitorIDs[3], competitorIDs[6], 5);
    const g35 = new Game(competition_id, competitorIDs[4], competitorIDs[5], 5);

    const g16 = new Game(competition_id, competitorIDs[5], competitorIDs[3], 6);
    const g26 = new Game(competition_id, competitorIDs[6], competitorIDs[2], 6);
    const g36 = new Game(competition_id, competitorIDs[0], competitorIDs[1], 6);

    const g17 = new Game(competition_id, competitorIDs[6], competitorIDs[4], 7);
    const g27 = new Game(competition_id, competitorIDs[0], competitorIDs[3], 7);
    const g37 = new Game(competition_id, competitorIDs[1], competitorIDs[2], 7);



    let games : Game[] = []
    games.push(g11)
    games.push(g21)
    games.push(g31)
    games.push(g12)
    games.push(g22)
    games.push(g32)
    games.push(g13)
    games.push(g23)
    games.push(g33)
    games.push(g14)
    games.push(g24)
    games.push(g34)
    games.push(g15)
    games.push(g25)
    games.push(g35)
    games.push(g16)
    games.push(g26)
    games.push(g36)
    games.push(g17)
    games.push(g27)
    games.push(g37)



    return games
}

function roundRobin8(competition_id:number, competitorIDs:number[]) : Game[] | undefined {

    const g11 = new Game(competition_id, competitorIDs[1], competitorIDs[0], 1);
    const g21 = new Game(competition_id, competitorIDs[2], competitorIDs[7], 1);
    const g31 = new Game(competition_id, competitorIDs[3], competitorIDs[6], 1);
    const g41 = new Game(competition_id, competitorIDs[4], competitorIDs[5], 1);



    const g12 = new Game(competition_id, competitorIDs[2], competitorIDs[3], 2);
    const g22 = new Game(competition_id, competitorIDs[0], competitorIDs[6], 2);
    const g32 = new Game(competition_id, competitorIDs[7], competitorIDs[5], 2);
    const g42 = new Game(competition_id, competitorIDs[1], competitorIDs[4], 2);



    const g13 = new Game(competition_id, competitorIDs[5], competitorIDs[1], 3);
    const g23 = new Game(competition_id, competitorIDs[6], competitorIDs[7], 3);
    const g33 = new Game(competition_id, competitorIDs[3], competitorIDs[0], 3);
    const g43 = new Game(competition_id, competitorIDs[4], competitorIDs[2], 3);



    const g14 = new Game(competition_id, competitorIDs[6], competitorIDs[4], 4);
    const g24 = new Game(competition_id, competitorIDs[7], competitorIDs[3], 4);
    const g34 = new Game(competition_id, competitorIDs[1], competitorIDs[2], 4);
    const g44 = new Game(competition_id, competitorIDs[5], competitorIDs[0], 4);



    const g15 = new Game(competition_id, competitorIDs[0], competitorIDs[2], 5);
    const g25 = new Game(competition_id, competitorIDs[3], competitorIDs[1], 5);
    const g35 = new Game(competition_id, competitorIDs[4], competitorIDs[7], 5);
    const g45 = new Game(competition_id, competitorIDs[5], competitorIDs[6], 5);


    const g16 = new Game(competition_id, competitorIDs[3], competitorIDs[4], 6);
    const g26 = new Game(competition_id, competitorIDs[7], competitorIDs[0], 6);
    const g36 = new Game(competition_id, competitorIDs[1], competitorIDs[6], 6);
    const g46 = new Game(competition_id, competitorIDs[2], competitorIDs[5], 6);


    const g17 = new Game(competition_id, competitorIDs[6], competitorIDs[2], 7);
    const g27 = new Game(competition_id, competitorIDs[7], competitorIDs[1], 7);
    const g37 = new Game(competition_id, competitorIDs[0], competitorIDs[4], 7);
    const g47 = new Game(competition_id, competitorIDs[5], competitorIDs[3], 7);




    let games : Game[] = []
    games.push(g11)
    games.push(g21)
    games.push(g31)
    games.push(g41)
    
    games.push(g14)
    games.push(g12)
    games.push(g22)
    games.push(g32)
    games.push(g42)

    games.push(g13)
    games.push(g23)
    games.push(g33)
    games.push(g43)


    games.push(g14)
    games.push(g24)
    games.push(g34)
    games.push(g44)


    games.push(g15)
    games.push(g25)
    games.push(g35)
    games.push(g45)


    games.push(g16)
    games.push(g26)
    games.push(g36)
    games.push(g46)


    games.push(g17)
    games.push(g27)
    games.push(g37)
    games.push(g47)





    return games
}