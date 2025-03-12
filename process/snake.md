# Snake

Okay well this is more of a thought experiment so I'm not going to try to be too clever about it, I just want to make notes on what there "is" in Snake and so correspondingly what can be manipulated (not what could be added because that is... infinite.)

My main point (having written some of the below) is that each of these lines is an opportunity for intervention. They are essentially "rules"? They could be augmented, altered, deleted, superceded, perverted, etc.

## Menu

- My game has a menu, it's a textual list of the available variations
- You move up and down it and choose one
- As of now a Snake "eats" the selection and then you switch

## Snake

- The snake has a head (white) and a body (grey) that follows along one tick behind
- The snake moves in the cardinal directions, once per tick
- When the snake moves there is a "move" sound effect
- The player controls the snake by specifying which direction to move in
- The snake can collide with a wall and die
- The snake can collide with itself and die
- When the Snake dies there is a "death" sound effect
- The snake starts as just the head at the top left; when it first starts moving it "unspools" into having a 3 unit body
- The snake can eat an apple and grow by a specified amount (default is 3 units)
- The snake can theoretically grow so large it occupies the entire playing area, at which point it will necessarily crash into itself and die

(A note: there are some kind of "second order" things here that I wonder about. Should I state that the snake can *eat its own tail*? Or is that a design moment? It's technically just there in the potential play of the game, but it signifies differently...)

## Apple

- The apple is a pink tile
- It is positioned randomly inside the walls and not on a snake
- The apple is always reachable
- The apple does not move
- If the Snake's head overlaps an apple, the apple is "eaten"
- When eaten the apple will reappear on a timer
- When eaten there is an "apple" sound effect

## Wall

- A wall unit is a grey square with a cross through it
- By default there are walls around the defined play area in a rectangle
- As above, if the Snake's head overlaps a wall the Snake dies
- Walls do not move and have no physics outside overlap (do I state that as a rule, or am I writing it to clarify something implicit? It's weird specifying negatives? But it makes sense to express negative capacities if we're talking about something an element *might* do?)

## Score

- The player gains points (10) each time they eat an apple
- That is the only event they gain points for (another negative rule... implying expansion... feels weird...)
- The score only increases
- The score is displayed to the player at the top right
- The score is updated each time it increases

## Text

- When the game begins movement controls are displayed near the Snake's body
- The current score is displayed as text at the top right
- When the Snake dies there is a delay, then GAME OVER is displayed in the centre of the playing field
- There are instructions for restarting and returning to the menu at the bottom of the screen
- There is a grid of potential text positions across the entire canvas (is this a rule? It's a technical truth...)

## Time

- Time is most obviously measured in ticks which define how fast the snake moves
- There is also the delay of the apple appearing
- There is also the delay after death of the GAME OVER appearing
- There is also the timing of the flashing of the Snake's body on death

## Sound

- There is a move sound
- There is an apple sound
- There is a die sound

## Physics

- The Snake can move
- The Snake can overlap meaningfully with itself, the apple, a wall
- The apple can appear and disappear
- The walls and apple and text do not move