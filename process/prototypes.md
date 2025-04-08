# Prototypes

In the continuing "don't write it all in the journal" mode, I'm going to try out a document where I write separately about prototyping and responding to the different candidate variations (I should call them "definitions"?) I'm making.

## Alarmist

> "someone who is considered to be exaggerating a danger and so causing needless worry or panic."

> The game panics as you get closer to walls. Increasing screen shake and messages strobing all over the place. I really like that. I guess it would be for the body too. I think this would be pretty fun to make.

### 2025-03-31

This is a funny one... a worried game that of course makes things worse the more it warns you. A pretty easy prototype that I'm happy with. Not a ton to report other than some performance concerns about my approach that... seem fine. Maybe not on mobile? Could be worth testing.

## Checklist

> "a list of items required, things to be done, or points to be considered, used as a reminder."

### 2025-04-03

Pursuing the idea of a series of things to do ended by "die" to win the game (so not Game over in the case? Or actually still game over but in a good way)

Prototyped that and it is pretty good! But maybe "die" should be ended at the end. That's a comic moment. Why am I thinking so much in terms of comic moments?

Yeah that's better.

## Conformist

> "a person who conforms to accepted behavior or established practices."

> Map out where the Snake is meant to go as a path and if they diverge they die (they need to be a conformist). Actually kind of horrible to imagine relative to the apples though? Maybe we could just map out a convoluted non-overlapping path that covers the whole space and eventually you'd hit your own tail? Could acknowledge anybody who pulls that off? How would you indicate the full path? Or just the next part of the path?

> Or maybe just a loop and the apple recurs on the same spot? Until you die... yeah. Yeah.

### 2025-04-08

Got this done pretty cleanly in the end. A nice green track you just go around until you die. I think somehow even though it's formally equivalent to being surrounded by walls it's funnier if you die because you go onto what appears to be empty space.

## Copyist

> A person who makes copies is fun. If the Snake is a person who makes copies (well they kind of already copy units of their own body in a sense) then what would they copy? Themselves? The apple? The walls? Not many options!

### 2025-04-08

I went with making a copy of itself so there's a sort of Tux and Fanny Snake thing happening except they die when colliding with each other. Unsure about how to handle dead-snake collisions? But it sort of seems fair that dead snakes would kill you too? Unsure?

Anyway there's a working prototype in place that "does the trick". Is that bad? That it just "does the trick"? Should I be aiming higher?

## Deist

> Because the definition I read specifically presents this as believe in a *non-interventionist god* (hi Nick Cave) I wonder if there's some juice to just having this be a Snake with no controls that moves across the screen (logically) and then hits the wall (dies).

### 2025-03-14

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

## Heist

> Just because heists are so game-like it would be fun to at least try to do this? Snake "breaks into" somewhere (how?? Eats the apple door?) Then in a confined space eats a bunch of green apples (money???) and then escapes... somehow? And little police walls come to chase you with sirens blaring???

### 2025-04-03

Sat here thinking about this for a while and I find the police walls kind of awkward/not useful. I'm not seeing how you would communicate what they are and they just sound like a drag.

HOWEVER, I feel like the core of a heist is that kind of planning idea? So I started thinking maybe it's all about the shape of the map, and making it a challenge to plan your route into the "bank" and its perhaps multiple caches of money... and maybe your body extends the whole time so you're worried most of all about your own body and planning around your body? Or not... I mean I think it's worth thinking about.

To begin with just a way to map out the walls and the money locations with a standard array of strings.

### 2025-04-04

Got it kind of done in the end. I think it works as a concept. There's a weird doomed heist thing where you can block your passage early on but I think that makes sense? 

Overall I think it's solid.

## Miniaturist

> "noun. an artist whose specialty is small, discrete works. a person who makes, collects, or specializes in miniature objects: a miniaturist with a collection of dollhouses."

> A tiny zoomed out snake right?

### 2025-04-03

Made an obvious version of this with the camera zoomed out. Had to correct a bit so you could see the instructions.

Miniaturist in terms of a person who makes/paints miniatures.

Also occurs to me that if it's portraiture you could make *only* the snake tiny... but that would massively fuck with the math around collisions.

I think it works as is... maybe a little awkward but ultimately pretty funny? Do I need to make the movement controls visible too? And the game over? Though the game over could be a problem because of the way the snake may overlap it... mmm.

COULD be worth trying for the miniature snake... but yeah it'd have some issues to be sure.

## Narcissist

> It's kind of pitch perfect to do this again. Doubling down on narcissism is what a narcissist should do. I wonder if it's worth including a bluesky posting option as well as email? Both? Tell them to enable popups?

### 2025-04-08

Did what I said I'd do. It's nice having a text to explain the email in case it doesn't trigger.

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

## Obstructionist

> "the practice of deliberately impeding or delaying the course of legal, legislative, or other procedures."

> Could place a wall in the direction they're going at a certain point... or make wals around the apple in an inconvenient way (within reason...)

### 2025-04-02

The basic idea works - it builds walls just ahead of you. I have them vanishing as well for now because otherwise it'll just accumulate.

There's a problem with placing the apple in a wall or the wall on the apple. So there's the possibility of things being kind of shitty.

Which... I care about. So I will do more. But we're getting there.

### 2025-04-03

I finished those basic problems. So now it's "fair" in the right way. As I'm noting in the in-progress commit message though, I'm not 100% sold on the comedy/aha value of the way it is right now. It may come down to a more compelling shape that gets put in the way. May need to read more about "obstructionist" but I feel like it needs to better convey that it's getting in the way, forcing you backwards... and right now it's maybe just a litte too abstract...

Anyway the base case is there and it *does* work, but it's one where it feels like there's a better idea available... somewhere in the ether...

## Onanist

> Masturbation x Snake. Masturbating a Snake like it's a penis? Yes yes yes.

### 2025-04-07

Ah yes, my birthday is the day I would prototyping a snake masturbation game.

My thought is: small snake. Move it left and right (more or less arbitrarily). It grows a couple of times (with or without an apple? Funnier without?). And after a while it dies (orgasms). Neat and tidy.

...

Well, this has come along pretty well. The "game feel" is about right. In making it I realized that I would want to make walls move around the snake rather than have the snake move, so it's a pretty big departure from standard snake, but not unreasonable I think.

So you can stroke the walls along the snake's body, and it gets bigger, and eventually it will die/orgasm. I'm having some trouble with trying to implement the snake shrinking if you don't keep going... which does feel important, so I do need to crack it. Mostly I think I've just let the implementation get kind of wonky and need to re-look at it. She'll be right. Won't she? I'll come back to it as the school bus is on its way.

### 2025-04-08

In one of the great programming moments I masturbated the snake until its head hit the opposite wall and it died. That is... really fucking funny. But I suspect it's not the right concept? But damn it's funny to do.

Intrigued by how the snake's death sound really does sound a bit like an orgasming crying out now. This is pleasingly weird.

Working on rhythm and speed and tempo stuff with the numbers.

I think it's largely there. Some testing perhaps, but it's pretty well on point now.

## Persist

> They aren't allowed to stop? Or they somehow persist through death? Or the game persists as a layer on top over everything else once you start it would be funny too? Just there forever? These are all GOOD IDEAS.

### 2025-03-29

Let's try this. I'm concerned about the question of what happens when the persistent snake dies? I suppose it just stays dead... so it needs to ignore the menu/restarts... or rather not ignore them but have a position on them.

---

Well it worked eventually once I understood about launching versus starting scenes and bringing them to the top and setting a transparent background.

The only annoyance is that if you relaunch persist then it will overwrite the old one as far as I can tell... so multiple persist scenes cannot persist with each other. Which is a sadness, but makes a certain amount of sense and so doesn't deeply bug me right now. But it would be *cooler* if there could be indefinitely many of them running. But I think since there's just one "persist" scene in existence it may not work unless I create a scene that itself manages subscenes... which... I think would get really quite fucked quite fast? Or not? I dunno, I can return to that element.

Main thing is that it's really quite a fun one because it seems completely normal until you actually exit the scene to the menu and then suddenly the scene is still there and still *playable*... though I need to remember to think about what happens when you press M or R... but I guess in both cases it's reasonable so maybe it's fine.

Haven't tested any of this on mobile so will have to do that at some point.

## Plenist

> People who believe all space contains matter. So the whole world of the game it walls and you die instantly. Nice and easy? Maybe it's a stupid one, but also who gives a shit?

### 2025-03-29

Just because it's easy to put this together I will do so. Even though Felix has been watching TV for too long.

---

Possible that's the record for fastest ever build? Hilarious. Hadn't realized the snake would die before you even press a key. Truly it is wonderful. Coming up with "What's the matter?" at the end is... pretty funny for now.

## Purist

> Just regular snake. I like this one. It's fun. And especially if I'm including dictionary definitions, e.g. "a person who insists on absolute adherence to traditional rules or structures, especially in language or style."

### 2025-03-24

I mean, I wanted at least one of these and this seems like the most obvious one. I prototyped it and included an "outro" saying "the old ways are best" to get the doubling down on the meaning. It works in its basic way.

## Sadist

> The player would be the sadist right? How? We encourage them to be by scoring points for killing the snake, not for eating the apple. Smash them against the wall, themselves, over and over, for points. GAME OVER if you let them eat the apple?

### 2025-03-29

This one seems simple enough...

---

Done. I think it works!? I wonder if there's room for some more comic timing and sound with the deaths versus the apple. Particularly whether you use the apple sound for death and the death sound for apple or not... right now I have the "correct" sounds which... makes sense. But it's plausible that flipping them makes sense... but it's also the case that an apple sound when you hit a wall makes the collision sound like there's nothing much happening... whereas the sadist element is that it's meant to hurt the snake.

So... probably the way it is. Maybe I will remove the delay to game over... as it's less obvious without the flashing... yeah that's better.

Okay, this one seems to be in alright shape.

## Tourist

> Snake over the top of famous locations. Good.

### 2025-03-30

I've been merrily cropping pictures from my own photos of different cities we've visited. Built up 12 with the idea this would be a kind of slide-show as the background of playing Snake. Which is pretty good.

But as I was doing that I was suddenly recalling that "see Venice and die" line. And then that was complicated on looking it up because in The Talented Mr. Ripley Dickie says "see Venice and die, is that what they say? Or is it Rome?" And then later in the Googling a very old letter turns up suggesting it's actually "See Naples and die", or more specifically "vedi Napoli e poi muori".

So now I don't know. I'll do the slideshow for right now, but a picture of Naples with the Latin or English at the end would be kind of spikier? 

...

But then I "realized" that the smooth move is "both". So that we have multiple "trips" you can take - Rome, Copenhagen, Caserta, etc. - and each time you die it's "See Rome (or whichever place) and Die". Best of both worlds

I think I like it.

## Twist

> A possibly more clear version of *alist*? Twist the tiles and deal with the visual result? The tiles could "do the twist" while you play? Layer upon layer of bad jokes? Don't hate it... come on baby, let's do the twist?

### 2025-03-25

I want to quickly bang this one together because I *think* it will be very easy? Just rotate stuff. I think also rotate stuff specifically when the snake turns? Or that's my first approximation. Let's try it out.

---

Well it worked juuuust fine. I like it. It looks weird. Not a lot more to say. Could look at getting more complex at the meaning of twist... into the idea of spirals or something say, but for right now what it is strikes me as a-ok. I'm enjoying how the different Snake body bits seem to rotate at... oh I see why. Yeah that's pretty funny actually. It's probably worth just looking at a constant rotation or like rhythmic "do the twist" thing rather than tying it to the snake direction?

Anyway, it's pretty good.

## Typist

> Typing out ALL WORK AND NO PLAY MAKES JACK A DULL BOY

### 2025-04-01

Spent a bunch of time on this, actually across two days, but I have to admit defeat because I'm stuck on word wrap. Not much to say. It's nice looking? I think it works?

#### 2025-04-01

Fuck you, wordwrap, I'm coming for you.