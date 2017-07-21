---
title: Elm – Performant web apps without Runtime exceptions
separator: ===
verticalSeparator: ---
css: 'custom/css/main.css'
scripts: 'custom/scripts/scripts.js'
theme: 'white'
highlightTheme: 'tomorrow'
revealOptions:
    controls: false
    transition: 'slide'
    defaultTiming: 0
    overview: true
---

<!-- ▓ - ░ -->

# Elm

![](https://avatars0.githubusercontent.com/u/4359353?v=3&s=100)
## Performant web apps
## without Runtime exceptions

<br/>

#### Irakli Janiashvili

===

# Topics

<br />

* What is Elm?
* Intro to Elm Language
* Intro to Elm Architecture
* Why Elm?
* Demos

===

# What is Elm?

===

# Elm Language

Note:
* Inspired by Haskell
* Written in Haskell
* Compiles in JavaScript

---

### Hello World

﹇
```elm
hello = "Hello World!"

⁅hello⁆
⁅-- "Hello FP Meetup!"⁆
```
⎵

---

### Literals

```Elm
42    : Int
3.14  : Float

⁅
'a'   : Char
"abc" : String
⁆

⁅
"""
Multi-line
Strings
"""
⁆

⁅
True  : Bool
False : Bool
⁆
```

---

### Operators

##### Arithmetic
```elm
20 + 12              -- 42 : Int
(12 - 2) / 3         -- 3.3333333333333335 : Float
(9 // 2) ^ 2         -- 16 : Int
123 % 2              -- 1 : Int
```
﹇
##### String
```elm
"Hello " ++ "World"  -- "Hello World" : String
```
⎵

﹇
##### Equality, Comparison, Boolean
```elm
False || False       -- False : Bool
1 /= 2 && 2 <= 9     -- True : Bool
```
⎵

---

### if/else expressions

```elm
if True then "Foo" else "Bar"
```

﹇
```elm
if a == 1 then
    "One"
else if a == 2 then
    "Two"
else
    "Many"
```
⎵

---

### case .. of expression

```elm
case a of
    1 -> "Hello"
    2 -> "World"
    _ -> "..."
```

﹇
```elm
case isAuthenticated user of
    True -> "Hello " ++ user.name
    False -> "User is not authenticated..."
⎵
```

---

### Functions

```elm
\n -> n ^ 2
```

﹇
```elm
square n = n ^ 2
⁅-- <function> : number -> number⁆
```
⎵

﹇
```elm
add a b = a + b
⁅-- <function> : number -> number -> number⁆

⁅add3 = add 3⁆
⁅-- <function> : number -> number⁆

⁅add3 2⁆
⁅-- 5⁆
```

---

### Type Annotation

```elm
isEven : Int -> Bool
⁅isEven n = n % 2 == 0⁆
```

﹇
```elm
fib : Int -> Int
⁅
fib n =
    case n of
        0 -> 0
        1 -> 1
        _ -> fib (n - 1) + fib (n - 2)
⁆
```
⎵

﹇
```elm
hello : String -> String
⁅hello name = "Hello " ++ name ++ "!"⁆
```
⎵

---

```elm
hello 42
```

﹇
```
–––– TYPE MISMATCH ––––

The argument to function `hello` is causing a mismatch.

3|   hello 42
           ^^
Function `hello` is expecting the argument to be:

    String

But it is:

    number
```
⎵

---

## Core Data Structures

---

### Lists


```elm
[1, 2, 3, 4]     -- : List Number
﹇
1 :: [2, 3, 4]
⎵
﹇
1 :: 2 :: 3 :: 4 :: []
⎵
﹇
[1, 2] ++ [3, 4]
⎵

﹇
List.map (\n -> n * 2) [1, 2, 3, 4]
⁅List.map ((*) 2) [1, 2, 3, 4]⁆
⁅List.filter ((==) 4) [1, 2, 3, 4]⁆
⎵
```

---

### Tuples

```elm
(12, 34)               -- : ( Int, Int )
﹇
("John", 18, True)     -- : ( String, Int, Bool )
⎵

﹇
Tuple.first (12, 34)               -- 12
Tuple.mapSecond ((*) 2) (4, 4)     -- (4, 16)
⎵
```

---

### Records

```elm
user = { name = "John", lastname = "Lennon" }
﹇
user : { name : String, lastname : String }
⎵

﹇
user.name ++ " " ++ user.lastname     -- "John Doe"
⎵
﹇
.name user     -- "John"
⎵
```

﹇
```elm
players : List { name : String }
players =
    [ { name = "John" }
    , { name = "George"}
    , { name = "Paul" }
    , { name = "Ringo" }
    ]

⁅List.map .name players     -- ["John", "George", "Paul", "Ringo"]⁆
```
⎵

﹇
```elm
{ user | name = "Jondo" }
{ user | name = "Jon", lastname = "Doe" }
```
⎵

---

## Other Core Data Structures

<br />

* Array
* Dict
* Set

---

## Defining New Types

---

### Union Types

```elm
type Animal = Cat | Dog
⁅
     ^____^   ^_______^
      type     type constructors
⁆
```

﹇
```elm
type Answer = Yes | No
⁅Yes     -- Yes : Answer ⁆
```
⎵

﹇
```elm
type Answer = Yes | No | Other String
⁅Yes                  -- Yes : Answer⁆
⁅Other                -- <function> : String  -> Answer⁆
⁅Other "Not Sure"     -- Other "Not Sure" : Answer⁆
```
⎵

﹇
```elm
type Answer a = Yes | No | Other a
⁅Yes                  -- Yes : Answer a⁆
⁅Other                -- <function> : a  -> Answer a⁆
⁅Other "Not Sure"     -- Other "Not Sure" : Answer String⁆
```
⎵

---

```elm
type Bool = True | False

﹇type List a = Nil | Cons a (List a)⎵

﹇
type Tree a
    = Empty
    | Node a (Tree a) (Tree a)
⎵
```

---

### Type Aliases

```elm
type alias Name = String
﹇
type alias Age = Int
⎵

﹇
type alias User =
    { name : Name
    , age : Age
    }
⎵

﹇
type alias Model =
    { users = List User
    , ...
    }
⎵
```

---

## Pattern Matching

---

### Pattern Matching on Core Data Structures

﹇
```elm
(x, y) = (322.82, 467.70)
﹇(a, b, c) = ("A", "B", "C")⎵
﹇(a, b, (c, d, e)) = ("A", "B", ("C", "D", "E"))⎵
﹇(a, _, b, _, c) = (1, 2, 3, 4, 5)⎵
```
⎵

﹇
```elm
x :: xs = [1, 2, 3, 4, 5]
﹇x :: _ :: z :: _ = [1, 2, 3, 4, 5]⎵
```
⎵

﹇
```elm
user = { name = "John", lastname = "doe", age = 23 }
﹇{ name, lastname } = user⎵
```
⎵

---

### Patern Matching on Union Types

```elm
type Answer = Yes | No | Other String

﹇
getAnswer : Answer -> String
⁅getAnswer answer =⁆
⁅    case answer of⁆
⁅
        Yes ->
            "Yes!!!"
⁆

⁅
        No ->
            "Oh no :((("
⁆

⁅
        Other reason ->
            reason
⁆
⎵
```

---

## Where is `null`?

<br />
<br />

﹇
<div class="quote">
    **I call it my billion-dollar mistake**. It was the invention of the null reference in 1965. At that time, I was designing the first comprehensive type system for references in an object oriented language (ALGOL W). My goal was to ensure that all use of references should be absolutely safe, with checking performed automatically by the compiler. **But I couldn't resist the temptation to put in a null reference, simply because it was so easy to implement**. This has led to innumerable errors, vulnerabilities, and system crashes, **which have probably caused a billion dollars of pain and damage in the last forty years**.
</div>

**Tony Hoare** (2009)
⎵

---

### Maybe

﹇
```elm
type Maybe a = Just a | Nothing
```
⎵

﹇
```elm
isAnswer : Maybe Answer -> Bool
⁅isAnswer answer =⁆
⁅    case answer of⁆
⁅       Just _ -> True⁆
⁅       Nothing -> False⁆
```
⎵

﹇
```elm
getAnswer : Maybe Answer -> String
⁅getAnswer answer =⁆
⁅    case answer of⁆
⁅       Just Yes -> "Yes!!!"⁆
⁅       Just No -> "Oh no :((("⁆
⁅       Just (Other reason) -> reason⁆
⁅       Nothing -> "There is no answer..."⁆
```
⎵

---

## Where are exceptions?

---

### Result

﹇
```elm
type Result error value
    = Ok value
    | Err error
```
⎵

﹇
```elm
getAnswerResult : Result String Answer -> String
⁅getAnswerResult answer =⁆
⁅    case answer of⁆
⁅       Ok Yes -> "Yes!!!"⁆
⁅       Ok No -> "Oh no :((("⁆
⁅       Ok (Other reason) -> reason⁆
⁅       Err error -> "error: " ++ error⁆
```
⎵

﹇
```elm
isYesResult : Result String Answer -> Bool
⁅isYesResult answer =⁆
⁅    case answer of⁆
⁅       Ok Yes -> True⁆
⁅       _ -> False⁆
```
⎵

Note:
* A Result is the result of a computation that may fail
* This is a great way to manage errors in Elm

---

### Function composition

﹇
```elm
(g ∘ f )(x) = g(f(x))
```
⎵

﹇
```elm
(g << f)  ==  (\x -> g (f x))
```
⎵

﹇
```elm
(g >> f)  ==  (\x -> f (g x))
```
⎵

﹇
```elm
not : Bool -> Bool
isEven : Int -> Bool
sqrt : Int -> Int

﹇
-- : Int -> Bool
(not (isEven (sqrt 9)))
⎵

﹇
sqrt >> isEven >> not
⎵
﹇
not << isEven << sqrt
⎵
```

---

### Pipe operators

﹇
```elm
String.join " " (List.reverse (String.words "Elm ❤️ I"))

⁅
"Elm ❤️ I"
    |> String.words
    |> List.reverse
    |> String.join " "
⁆
```
⎵

﹇
```elm
List.map ((*) 2) (List.filter ((/=) 4) (List.length [1, 2, 3, 4]))

⁅
[1, 2, 3, 4]
    |> List.map ((*) 2)
    |> List.filter ((/=) 4)
    |> List.length
⁆
```
⎵

﹇
```elm
text (alignCenter ((color "Blue") "Some Text"))

⁅text <| alignCenter <| (color "Blue") <| "Some Text"⁆
```
⎵

Note:
* Similar like Unix pipes, borrowed from F#
* Chain different functions when type signature match

===

# Elm Architecture

---

* **Model** — The state of your application.
* **View** — A way to view your state as HTML.
* **Update** — A way to update your state.

![](https://guide.elm-lang.org/architecture/effects/beginnerProgram.svg)

---

### Model

```elm
type alias Model = Int

init = 0
```

---

### Update

```elm
type Msg = Increment | Decrement

update msg model =
    case msg of
        Increment ->
            model + 1

        Decrement ->
            model - 1
```

---

### View

```elm
view model =
    div []
        [ div [] [ text <| toString model ]
        , button [ onClick Increment ] [ text "Increment" ]
        , button [ onClick Decrement ] [ text "Decrement" ]
        ]
```

---

### Html Program

```elm
main =
    Html.beginnerProgram
        { model = init
        , update = update
        , view = view
        }
```

---

* **Commands** — A Cmd lets you do stuff: send an HTTP request, generate a random number, etc.
* **Subscriptions** — A Sub lets you register that you are interested in something: tell me about mouse movements, listen for web socket messages, etc.

![](https://guide.elm-lang.org/architecture/effects/program.svg)

---

### Model

```elm
type alias Model =
    { time : Int }

init =
    ( { time = 0 }
    , Cmd.none
    )
```

---

### Update and Subscribe

```elm
type Msg
    = Tick Time
```

```elm
subscriptions model =
    Time.every Time.second Tick
```

```elm
update msg model =
    case msg of
        Tick _ ->
            ( { model | time = model.time + 1 }
            , Cmd.none
            )
```

---

### View

```elm
view model =
    text <| toString model.time
```

---

### Html Program

```elm
main =
    Html.program
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
```

===

# Why Elm

* Beginner friendly with explanatory error messages.
* Well-architected code with pleasing refactorings.
* Blazing Fast. [1]
* No runtime errors in practice.

[1] [http://elm-lang.org/blog/blazing-fast-html-round-two](http://elm-lang.org/blog/blazing-fast-html-round-two)

Note:
Fast because of: Immutable data structures – reference equality

===

# Demos???
## [TBD]

* Compiler led development
* Time Travel debugger
* State Export -> Import

===

# Elm Packages
## [TBD]

===

# JS Interop.
## [TBD]

===

# Adopting Elm
## [TBD]

===

# Elm Community

* Reddit [/r/elm](https://reddit.com/r/elm/)
* Slack [elmlang](http://elmlang.herokuapp.com/)
* http://elm-lang.org/community

===

# Questions?

===

<br>
<br>
<br>
<br>
<br>

# Thanks 🙌

<br>
<br>
<br>

#### [@iJaniashvili](http://twitter.com/iJaniashvili)
#### https://github.com/iJaniashvili/talks/Elm
