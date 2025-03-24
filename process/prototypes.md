# Prototypes

In the continuing "don't write it all in the journal" mode, I'm going to try out a document where I write separately about prototyping and responding to the different candidate variations (I should call them "definitions"?) I'm making.

## Deist

> Because the definition I read specifically presents this as believe in a *non-interventionist god* (hi Nick Cave) I wonder if there's some juice to just having this be a Snake with no controls that moves across the screen (logically) and then hits the wall (dies).

## 2025-03-14

I'm going to prototype this one just because it's so simple. Non-interventionist god (the player) therefore does not intervene (has no controls) and the Snake goes along its track and dies (hits the wall).

I think there's some philosophy here around why the Snake wouldn't be autonomous (as in Determinism) but I think the purest sense of the Snake living its life without the God puppeting it is that it would simply hit the wall and die. 

The fact the apple would (I think?) appear after the Snake's inevitable death is kind of a weird critic of their God?

Do I acknowledge the intervention bit? If the player *tries* to intervene do I show a message saying "don't intervene"? Do I play an "error sound" so they understand it's not allowed? 

Well let's prototype!

...

I prototyped.

It works pretty well as an idea. I feel the match between the definition and then the playing out of the game is satisfying.

Right now I have an "controls" text that explains how to play:

> Do not intervene

And the keys do nothing. But I suspect an error sound is going to make sense? BUT there's also an oddity around being a non-interventionist god who CANNOT intervene? But I suppose maybe such a non-interventionist god would have programmed their universe not to allow intervention? It's hard to say.

At the end right now in a fit of probably incorrect whimsy I have

> Well that happened.

Which I don't think works at all but I just wanted to try out having some text there. It does feel like ending texts can be a nice way to close out and resolve the feeling of the joke? So it may be I want to say *something* but probably not this.

## Delist

> Menu-only game. You select this item, the menu-snake eats it, and then it's gone and you just choose something else. *That* is funny.

## 2025-03-13

It's kind of embarrassing to have to quote myself saying something is funny. I hope it's actually funny. It seems like a good one to prototype because it's so basic conceptually and takes place entirely in the menu... welll.... no actually I suppose you would want to switch to the definition screen and then come back to the menu to find the item is gone. So I'll work on that. Now.

...

Okay got the basics of this working. It's remarkable just how much shitty/bad code I wrote to get it in there. It's such a special case it's clearly not worth engineering some kind of more general solution, but it's genuinely quite horrible how many things I did to pop it in:

- Have to "fake" its state name to "menu" for the game's data so that after the Definition screen it goes to menu (that's not so terrible)
- Had to add code that causes the snake to "eat" letters as it goes over them to `tick()` *if* the delisssting option was selected.
- Had to add localStorage so that the game saves a cookie (I suppose Google when then delete this, great, maybe I should work around it?) when you choose delist, and then specifically blanks the menu item title for delissst in Menu.create() if that cookie is there
- Had to change up() and down() in Menu so that it skips over the blank space if delissst has been delisssted

It's kind of an object lesson in how janky and gross the underlying code can sometimes be for a beautiful and pure idea. Because I do think it works really nicely in the end. You select it, get a crisp definition of delisting, and then instead of getting a game you go back to the menu with the thing you just selected delisted. Chess's kiss etc.?

But yeah, there's maybe some thought to be given to maintining internal state about this rather than working through localStorage even though it's very funny that it would stay delisted "forever" with the Cookie. If cookies are sort of dying then may as well just keep it internal, not that hard to do since I'm already passing data between the states.

## Demist

> Snake body demists the screen (only where it can reach though, so you might have the comedy of all the other stuff being blurred (ideally we have blur)). And that's it. Mist builds back up maybe over time so it's a constant battle of it being hard to see...

### 2025-03-24

This just seems like it'll be "easy" so I might as well make it to make something. The screen is "steamed up" (covered in semi-transparent tiles in an overlay over the whole thing). The snake clears the steam. The steam comes back.

...

Well went away and implemented it. It works. No cute ideas for the outro text as yet.

## Gist

> The idea of a total distillation of Snake even more than it already is. A presentation of the game that's like "I get the gist". Which could also be temporal, like you eat one apple, another appear, and then it ends saying "you get the gist".

> This almost functions as a meta-joke about the whole Snake series (and my work in general), that you engage enough to "get it" and probably move on. Gist games. Hehe.

### 2025-03-11

Going to try this one now because I think it will get at a key "issue" around overall structures for showing a definition and for potentially showing a "post game" quote or text. OR I could show the definition *after* the game? Anyway, clearly desirable to be able to display a more "plain" text. Though even this may need to extend Snake, just without the Snake? Let's see.

...

Latère (in Sponge Bob French Accent)...

I ended up going into a bit of a hole around more general design ideas, which is what I would have expected. Except where do I write about that? Here because it was a conversation born of prototyping and the ways in which prototyping actually can force you to develop ideas that aren't strictly part of the prototype but more far reaching? Well, let's try that. 

#### Definition screen

The gist definition was one of the ones where it felt important to show the player the definition of the word first, because I think there's some comic timing enabled between that, a short amount of play, and then the "you get the idea" moment right at the end. So I needed a separate screen for the definition, which I'm (for now) extending to all the variations (it's simply too awkward to call them definitions here). So each one opens with a blank screen stating the definition, then you go into the game itself. 

That required the easily imaginable amount of crap around implementing a class, making mistakes, adding to the existing data in the JSON, messing that up, blah blah. But got there in the end. So this now exists.

#### Outro

The gist one also cries out for a blasé "well now you know" end statement and it turned out that I'd already implemented this idea in the existing code, so I was able to just use that. The game now adds an extra text on game over which I can use to say "you get the idea", which is funny. To me.

#### Timing

I also did the most basic pass on the timing of Gist, which is that the level ends a couple of seconds after you eat the first apple, the idea being you've essentially seen the game... you move, eat an apple, get longer... may as well die. (Actually I kind of enjoy the conversation between this and the eternal Robert Yang "describing experimental ideas versus making them" strawperson thing.)

In implementing that I realized this doesn't account for dying before eating an apple though... you could crash into a wall, die, and be told "you get the idea". So it's possible we need to NOT say you get the idea until death-by-timer because they DON'T get the idea? "Maybe you should try again?" (I'll throw that in now...)

And opening up dangerous territory what if you eat the apple and we timer-kill you... but you haven't technically experienced crashing into a wall... so... do you get the idea? Kind of because I think it's relatively clear? How much do you get the idea because you're meant to already know about Snake?

How far does this go... hmmm... does actually need though.

## Nudist

> I made a pink snake but snakes are probably already nude? I'm wondering about the idea of the snake shedding its skin as a "more nude" snake? Constantly shedding its skin... kind of funny and is a sort of mechanic too, builds walls... or... well do you die if you hit a snake skin?

### 2025-03-11

As per the existing candidate description above, I'm not really clear on this, but wanted to signal here that even having a pink snake is working weirdly well and... actually I'm seeing a ... well I don't know...

So right now we have: definition > game with a pink snake (ugh) > when you die it says

> AT LEAST YOU DIED NUDE

Which I find really funny. It kind of harks to early text adventures somehow in its bluntness? And it actually activates the nudeness more than I thought it would. It kind of doesn't matter than the gameplay is no different that before... the nudeness is now just something to be aware of.

It raises the question of whether this ought to just be the normal grey snake though, which is already nude. Which might conjure more of a (comic?) trajectory of

Start playing > huh? this looks the same > die > "at least you died nude" > aha! the snake was always nude!

Or whatever? Anyway, I'm pleased by how a little bit of language is at least offering some more potential without overwhelming the project is what I'm saying.

For now I'll leave the snake pink solely because it's funnier, but on principle it's probably the wrong move.