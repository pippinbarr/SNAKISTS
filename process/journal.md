# Journal

## Ists (2025-03-06)

Well, it begins. What am I doing? I'm avoiding working on other projects like a "game poem" and also the next step along the way of the *It is as if* projects. I'm doing that by making a sequel to SNAKISMS called SNAKISTS which allows me to do another suite of these stupid things with a slightly different flavour. Don't know what that flavour is yet... for now I literally thought it would be fun to use IST instead of ISM as the sequel indicator.

Let me list a bunch of ISTS and worry about them later:

(Taking these from a [scrabble dictionary](https://scrabble.merriam.com/words/end-with/ist) because it's what I found)

- nudist (default?)
- purist (default?)
- agist
- exist
- mist (fog of war)
- fist (boxing? snake as punch?)
- heist (robbing a bank?)
- assist (helping another snake?)
- sadist (surely?)
- tubist (tuba music and rhythm on tick)
- egoist
- insist
- typist
- artist
- cubist
- jurist
- atheist
- chemist
- dentist
- fascist
- lookist??
- narcicist
- onanist
- animist
- duelist
- elitist 
- persist
- baptist
- guitarist
- dadaist
- diarist
- egotist
- entwist
- florist
- ...

That's to the end of the 7-letter words anyway.

One thing that I find fun here is that unlike ISM, the IST ends up with a bunch of words that are *not* about philosophical positions because IST is just a more common suffix (e.g. persist), and you also end up with kind of quite negative words (agist, fascist)... these are less abstract and more forceful? Maybe they're harder or easier to turn into snakes?

As I wrote stuff down I confess I usually had no fucking idea of what to do for them, so let's not get too excited. But still this is at least a funny experiment for now.

## Organization; Chronological design?; Ist listing (2025-03-09)

### Organization

Spent my time on Friday morning moving away from "designing in the journal." Which strikes me as a whole thing to think about relative to MDM. Where design happens versus where reflection happens. And they're of course incredibly intertwined but at least for this project it has felt like it makes sense to have separate documentation of elements of the design process. Specifically there's now a separate [ists](./ists.md) list that just contains all the ists pulled from a Scrabble dictionary that I'm going through to check which ones lead to design ideas. And then there's a list of [candidates](./candidates.md) where I'm building up a list of the ideas that feel like I should at least prototype.

### Chronological design?

One thing about these two new (design) documents is that they're not (in themselves) chronological but rather... what... topical? Taxonomic? And as I'm writing this I realize how much I think of design as a chronology! As a passage through time with a person grappling with ideas and materials and figuring it out. Which seems like... an odd way to think about design perhaps. But that is for sure what seems natural... either because it's my brain or even because of the way I've traditionally kept a journal relative to design practice that makes it seem like design should/can be framed in terms of a passage of time.

This may merit further thought... there's more to this and I think it's important in the context of MDM.

### Ist listing

Anyway, the listing of ists and just combing through them one at a time has been a really pleasant activity. Almost like a series of flash cards or actually those verb noun subject cards Rilla and I had where you just are shown some information and try to snap out a game idea. Feels like improv perhaps? Never done improv but I sure have ended up hearing a lot about it. Yes, and. Improv with yourself? (Is that a euphemism for masturbation?) Improv with the materials? (As distinct from conversation?)

The process also reminds me a bit of PONGS which was epochal in terms of that idea of coming up with *lots* of (separate but related) designs, rather than trying to come up with "the design". SNAKISTS (and the others) is even "easier" in the sense that you don't need to generate the idea from nowhere but rather in reaction to a word, a definition. 

So yeah, it's a fun design exercise. As I write this I'm remembering that I was maybe walking somewhere and thought to myself I (or with someone else?) could write a design "textbook" that is, say, 10 exercises for design, premised on stuff I do "naturally". This would for sure be one of them. And the book could offer the exercise, resulting work, and get into the weeds a bit on the subtleties of how the exercise functions, how it relates to design as a practice, what aspects of your designerly practice it might shape, and so on. The bridge to it being relevant to game-y-game folks might be tough but might not be. (I'm being put in mind of Jon Sharp and Colleen Macklin's book here which I should check to see if it's somehow exactly what I'm proposing?)

(Though note how this would be a potential format/approach for MDM-based reasoning to be applied at the level of teaching design? Learn from the "master" ahahahaha)

## Prototyping is fun and design; hierarchies of design practice? (2025-03-12)

### Prototyping is fun and design

As I type this I'm not actually in a "fun mood" but yesterday I treated(?) myself to doing some prototyping as a break from the ist-defintion-to-candidate grind to build a couple of the variations to get a read on how they might plausibly turn out. Most of my focus was on Gist because it's such a "simple" idea (an abbreviated experience of playing Snake), but at least intuitively I figured that protoyping it would also engage other design and implementation muscles (because you can't have one without the other, or you can't make an omelet or whatever). And indeed:

- Gist turned out to be more complex when I implemented, particularly the question of whether dying without eating an apple counts as "getting the idea" and if it does what to do if the player does that (still don't know)
- Gist led me to want a pre-game screen that provides the definition of the word, especially thinking ahead to lesser-known ist-words where it'd be helpful, but also it adds a kind of grave tone that I think is a fun juxtaposition to the games themselves which are of course largely functioning as jokes?
- And making that had me thinking about where and when to display texts - you could put the definition on the game screen before play for instance, but I wanted to separate it to give it room to breathe; and then there was the question of any game-specific ending text (such as the "You get the idea" of Gist) and whether that should be in a separate screen or just on the death screen - went with the later to avoid *too* much screen-to-screenery.
- Prototyping activates different thought processes and attentions and one thing I keep being aware of is the level of "materiality" I guess I'm dealing with here which is *not* "implementing Snake variations in JavaScript" and not even "implementing Snake variations in Phaser 3" but "implementing Snake variations on top of my existing framework for Snake from Let's Snake and before that SNAKISMS". Which leads to very different kinds of thinking about what to do and how to do it - the framework literally has a spot to put extra after-death text for example, which encouraged me to think in that way; or just the idea of the definition screens still being built on the Snake class because it's just easier to hide all the snake stuff and leave the words...
- Well and there's some argument to be made about a kind of Platonic Snake here where what I'm often thinking about are the basic building blocks of snake:
    - The snake, its movement, its vulnerability, its growth
    - The apple, its appearance, its position, its effect
    - The walls, their appearance, their position, (their effect?)
- Prototyping will (probably) circle back around to how I'm able to think about the ists I'm yet to read and develop ideas for - unsure how yet, but hard to believe having dipped my hands (eyes? brain?) into the actual code and framework won't shape how I think?
- And very obvious but in prototyping these things I was designing, because my definition what to do in the [prototypes](./prototypes.md) document is not total, so I'm making decisions (moves) as I go through with the coding, and the coding is forcing/encouraging certain moves too

Well so... doing a bit of prototyping was: nice. And I'll keep doing that alternation probably because it just feels generative.

### Hierarchies of design practice?

That feels a bit grandiose, but I'm trying to get at the way that this project seems to have some kind of structure around design... targets? Processes? Somethings?

- "Snake" is a key design material here but nowhere have I actually specified it in a design sense, you could point to [Snake.js](../js/Snake.js) as defining my version of Snake, and that is importantly specific, but it would conceivably be worth having a `snake.md` where I'm reflecting on, laying out the nature of Snake explicitly? This taxonomizing is getting to me.
- "Words ending in ist" are a material to work with at a pretty high level, and they have their own document: [ists](./ists.md)
- Then I have the document where I'm considering actual [candidates](./candidates.md) for prototyping - this represents a decision that a word is worth pursuing further (I actually identify these in the [ists](./ists.md) document), and reflects it by... pursuing it further in design, trying to accomplish a description "what that version of Snake would be", though at least the way I'm working it's not very carefully specified - kind of enough to convince myself I could build it to try it out...
- Which is what I'm reflecting on in the [prototyping](./prototypes.md) document - so this document + the commits associated with that prototype (hmmm should I be linking them somehow? Relevant commits? Getting a bit librarian...) is a reflection-in-action(?) on the specific forms of Snake (and are a representation of the game being made)
- And then here in the [journal](./journal.md) I'm trying to get my bearings a bit because I have traditionally done a lot of the design thinking here rather than in separate documents. Now this bit is more of a larger reflection on how the whole thing is going according to the big pictures; I was reading the [[Schön x Bennett chapter](https://hci.stanford.edu/publications/bds/9-schon.html)] this morning and would link this to [[stop and think](https://hci.stanford.edu/publications/bds/9-schon.html#:~:text=In%20some%20design,means%20and%20ends.)]?
- And way up in the clouds there's [why](./why.md) (which of course I embarrassingly haven't written yet) where I'm supposed to be identifying and refining my understanding of "what this project does" in terms of why I'm making it, how it is "research" and so on. What is it outside of a joke...
- And then at the "end" there's the [closing statement](./closing-statement.md) which I guess is a final "stop and think" with the project more or less in the rear view mirror. I suppose you could argue there's an opportunity (requirement??) in the closing statement to expand outward to what Schön calls [reflection on practice](https://hci.stanford.edu/publications/bds/9-schon.html#:~:text=In%20a%20third,build%20the%20diagram.%22) here? Could be.
- And really there's also then the release "into the wild" and the potential backtalk and conversations around players and how they experience and react to the game. Which could lead to changing the game, or just thinking about it differently. And this is a part I'm yet to find a particularly good way to document (mostly because most games get no response?)

And I guess the Schön-y argument about this is that each of those processes/documents/levels is still part of the design practice (maybe either writ large, but even all for this specific project).

Which doesn't really take me anywhere, but it's been interesting to think about.

## Death of the journal? Themes? Bigger Pictures? (2025-03-25)

### Death of the journal?

It's been really noticeable how "unneeded" my journal has been for this project. It's only 2000 words long for cryin out loud! And there are obvious factors here that I think play into MDM stuff writ large:

1. Maybe most obviously, this is not a very tormenting design project... it's all about reacting to words in the language of Snake, so there's not a lot of high level tossing and turning about "what it all means"? Although... there's probably should be because I think there are some bigger picture reflections on design available through this process.
2. But crucially too: I have this document structure around ist > candidate > prototype which obviates the need to wrestle with lower level design thinking specifically in the journal, which is where I used to do that.

Hard to quite say whether this highly structured document approach is something I could do for *any* project? Would it have worked for "on your phone" for instance where I feel like the process was a bit more messy? Less clear what the divisions would be up front and more something I had to feel out? But would it still have been worth having some sort of file division around different practices/levels of design? Unclear maybe.

Anyway, the point being that the journal has not felt as immediate in the day to day; but secret I think it maybe has meant that some of the higher level reflection *is* being missed around what this particular game project means about design and also some of the more thematic drawing together of different kinds of observations at the project level too... so let me... at least try? It feels exhausting but...

### Themes?

As part of running through the dictionary and just trying to design in immediate response to word definitions I feel like there are a few categories of design "move" or... something... that come up repeatedly? Or that are just worth noting...?

#### The same thing

The idea of -ists that end up just being Snake with no modifications. Purist, Nudist, Individualist, ... -- that's both funny and kind of about the question of how you characterize underlying value or other systems of a game like Snake. Is Snake "fascist" in some way? Do videogames have inherent political or cultural alignments? It's a pretty interesting question at the level of design? It might also be a (truly weird) kind of language/insight into why some forms of design are just harder than others? If Snake is a Fascist is it harder to create progressive revisions?

#### Non-philosophy

With SNAKISMS the whole point was to channel -ism as a conduit to philosophical (and perhaps political) positions. But in just going through the *dictionary* understanding of -ist as a suffix, there's a big broadening out. There are a bunch of words ending in -ist that aren't "ISTS" in that sense. Like "twist" or "delist" and there's been a pleasure in how kind of practical they are? Could also be a verb form thing that works well with games? Getting across to that Noun Verb Adjective design approach or whatever? Grammar-based design? Design language. Etc.

#### Power of text

It's come up more than once that the text presented at the *end* of play with the game over can be quite a powerful spiking of the ball or context giver or... just emphasis on the joke/idea? "At least you died nude" "You get the idea". 

#### Snake as a language

Have said this plenty of times, but good to keep it in mind. An obvious way to think of this whole project is that Snake presents you with a language (or play) and the process becomes about how the Snake-language can "say" or "define" the word in question. And one thing that happens is you do run into how limited the Snake language is... it can't say *everything*, some of the things require adding or changing so much stuff it's questionable to say it's still Snake? So that kind of range of power... the question of where the borders are, the question of *which* words are easy/difficult to say in Snake feels... revealing? About Snake?

#### Excited but idea-less

There's a whole category of words that I *want* to be able to Snake but don't have an idea right away. Like, say, Fascist. But this also makes me wonder... if there's not an idea almost instantly, given how simple the Snake language is, does that mean... there's no idea to be had? To what extent can you worry the bone of Snake until you make something fit into it? Or is the language so simple there's not much to be done?

#### Word recognition

So many words are insanely hard to recognize. Lots of them are archaic, or actually Scots, or just not popular. And some of those words have really fun definitions but it raises the question (somewhat helped along by the definition pages) of whether I'm interested in "teaching words" to the player. To what extent does the game work best with more immediate/low-friction words the player just knows and so can anticipate... versus using weirder words and defining them? Or is a mix the right sauce?

#### Locus of intervention

There's something in here about how you view/frame the materials of making for this. Most obviously it's Snake. But you could also say "Snake as implemented in Snake.js". Or "Snake as it exists in Pippin's mind" (reflected in my [Snake](./snake.md) document?) But you could also say "Snake as in the entire game including the menu" at which point you get something like "delist" or one of my ideas for "persist".

Expanding outwards from the obvious can be satisfying and effective, a moment for designer and player to metaphorically look up from the computer and recalibrate their eyes and brains? Narcissism in SNAKISMS was a good example of that. "Oh yeah, I'm playing a game on a computer with email, the person who made this game has an email address..."

### Bigger Pictures?

Are there even bigger pictures? What did I even mean here? I think I meant something about what this game and process says about Design Writ Larger, or about MDM as a project? I'm running out of steam though.

Well I do think design by holding a play language (relatively) still and bombarding it with just "words from the dictionary" is a pretty amazing design exercise regardless. It's fun. It also makes me think in this moment about (weirdly) some sort of science setup where you fire electrons and something to understand it better (is that a collider? something else?). The words are the electrons, and the snake is the thing we seek to understand. There's something to that; I think there's a bigger and more substantial argument to be made about this form as a way to explore and understand forms of design.

And then as for MDM... I mean the fact I'm writing this is really the outcome I want. I don't want to lose the higher level reflections that the journal allows for. The "stop and think" that's really important; or like the "practice review" that's important. And... I suppose I'm not. Go me.

## The end in sight (2025-04-09)

Yeah well, journal just not a happening thing eh? This is two weeks on since writing the previous journal entry. It just hasn't been necessary to navel-gaze in the way I think I often do in the journal... and of course the new document structure has meant there have been other places to do the moment to moment designing. And plus this game just... isn't all that complex to design. The writing feels more spread out for this one... is that even a good thing? Honestly I don't know. It feels like it has been a successful process, but at the same time I'm not sure that I learned as much from this one as I have in the past?

It's a great process and it works, but I knew that. I don't think there was a ton of confrontation with really hard design problems, though there was the usual cache of solutions I was really happy about finding, and that whole thing of kind of confirming instincts in implementation and then play (the feel of onanist is one such for me). 

In a way it feels almost over documented, but on the other hand with such a massive word search and then that kind of "panning for gold process" filtering from [ists](./ists.md) to [candidates](./candidates.md) to [prototypes](./prototypes.md)... it made sense I think to break it apart so you don't just have an enormous document mixing all those ideas up. But that process *was enough* to a point where I wasn't really questioning much at the journal level? Does this mean I haven't learned much about design from this one? It's not impossible?

I think there remain big and cool things to say about the larger project of translation/adaptation to game languages and about the power of small-scale variation, but this game is a datapoint rather than a revelation? But that's also... important... understanding design as part of a much larger exploration than the individual "product" you're working on?

So I dunno. Would I use this same structuring principle in another project? I think I'd at least give some thought to division of labour between different elements. But I do regret, to some extent, not returning to the noodliness of a journal entry more often, just to get in touch with more uncertainty than I think gets expressed at lower levels of this thing.

--

Meanwhile I'm mostly waiting on some feedback from Jim on the accessibility of the variations before largely considering the thing done.

I should run some phone tests too because it's displaying ugly as sin. If I had the energy I might think about scaling/positioning to maximize real-estate for width. Can I be fucked? Dunno.

## Closing statement too open? (2025-05-02)

I'm making the odd-feeling choice of writing a journal entry about my [closing statement](./closing-statement.md). I've been working on it for a few sessions now, and I have some text in place, but I'm aware of struggling to do anything that feels genuinely worthwhile. Had lunch with Rilla and Matt today and that whole question of the value of the "higher level" writing came up, and I found myself saying that it should be sort of enjoyable or inspiring to do that part of the writing – in that moment I was sort of trying to convince Matt, but I think I was probably even more trying to convince myself.

So why isn't writing a closing statement fun then? Or why isn't this one?

- Partly it just feels like a chore because I have this sense of not really adding enough to the language/insight that I "achieve" in the journal and commits and other documentation? So that I'm putting myself more in a role of just pulling together stuff into themes and then... that's it... hasn't felt like I'm adding a lot on top of that
- No real audience? I'm generally the audience of my documentation stuff, but here I'm not all that interested because it's a level at which I already *know* - I'm not saying something new, I'm gathering the stuff I figured out. So it's likely the case that this closing statement step would need a target audience - could be my website where I'm trying to explain something important about the game in question, could be a publication target?
- Lack of specificity. In looking through the entire project documentation for thematic areas and then reporting on the thematic areas I'm missing the idea of some really important core concern that I want to build an argument/story around. Maybe SNAKISTS is just bad for this because it's a repetition of things I've already done, but in that case I should be looking for what is plausibly unique (e.g. the "everything is Snake" idea) and *only* telling that story?

Outcome: Do things I just said to do?