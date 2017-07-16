---
title: Elm – Performant web apps without Runtime exceptions
separator: ===
verticalSeparator: ---
css: 'custom/css/main.css'
scripts: 'custom/scripts/scripts.js'
theme: 'white'
highlightTheme: 'tomorrow'
revealOptions:
    transition: 'slide'
    defaultTiming: 0
    overview: true
---

# Elm

![](https://avatars0.githubusercontent.com/u/4359353?v=3&s=100)
## Performant web apps
## without Runtime exceptions

<br/>

#### Irakli Janiashvili

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

⁅
hello
⁆
⁅
"Hello FP Meetup!"
⁆
```
⎵

---

### Literals

﹇
```Elm
42    : Int
3.14  : Float

⁅
'a'   : Char
"abc" : String
⁆

⁅
True  : Bool
False : Bool
⁆

⁅
"""
Multi-line
Strings
"""
⁆
```
⎵

---

### Arithmetic operators

```elm
23 + 19    -- 42 : number
2.0 + 1    --  3 : Float

﹇
6 * 7      -- 42 : number
10 * 4.2   -- 42 : Float
⎵

﹇
100 // 2   -- 50 : Int
1 / 2      -- 0.5 : Float
⎵
```

---

### if/else expressions

```elm
if True then "Foo" else "Bar"

﹇
if a == 1 then
    "Hello"
else if a == 2 then
    "World"
else
    "..."
⎵
```

---

### case .. of expression

```elm
case a of
    1 -> "Hello"
    2 -> "World"
    _ -> "..."

﹇
case userIsAuthenticated user of
    True -> "Hello " ++ user.name
    False -> "User is not authenticated..."
⎵
```

---

### Functions

```elm
square n = n ^ 2

﹇
fib n =
    case n of
        0 -> 0
        1 -> 1
        _ -> fib (n - 1) + fib (n - 2)
⎵
```

---

## Data Structures

---

### Lists


```elm
[1, 2, 3, 4]
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
[1, 2, 3, 4]
    |> List.map ((*) 2)
    |> List.filter ((==) 4)
    |> List.length
⎵
```

---

### Tuples

```elm
(12, 34)
﹇
("John", 18, True)
⎵

﹇
Tuple.first (12, 34)                        -- 12
Tuple.mapSecond (\x -> x ** 2) (10, 10)     -- (10, 100)
⎵
```

---

### Records

```elm
person1 = { name = "John", lastname = "Doe" }
﹇
person2 = { name = "Jane", lastname = "Roe" }
⎵

﹇
person1.name ++ " " ++ person1.lastname     -- "John Doe"
⎵

﹇
List.map .name [person1, person2]           -- ["John", "Jane"]
⎵

﹇
-- Record update
{ person1 | name = "Jondo" }
{ person1 | name = "First", lastname = "Last" }
⎵
```

---

## Defining Types

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
type State = Pending | Done | Failed

⁅type Answer = Yes | No⁆
⁅type Answer = Yes | No | Other String⁆
⁅type Answer a = Yes | No | Other a⁆

⁅type List a = Nil | Cons a (List a)⁆

⁅
type Tree a
    = Empty
    | Node a (Tree a) (Tree a)
⁆
```
⎵

---

```elm
type Bool = True | False

﹇
type Maybe a = Just a | Nothing
⎵

﹇
type Result error value
    = Ok value
    | Err error
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
type alias Person =
    { name : Name
    , age : Age
    }
⎵

﹇
type Person = Person Name Age
⎵
﹇
Person "John" 18
⎵

﹇
type alias Model =
    { data = List Person
    , state = State
    }
⎵
```

---

## Pattern Matching (Destructuring)

---

### Pattern Matching on Tuples

```elm
(x, y) = (322.82, 467.70)

﹇
(a, b, c) = ("A", "B", "C")
⎵

﹇
(a, b, (c, d, e)) = ("A", "B", ("C", "D", "E"))
⎵

﹇
(a, _, b, _, c) = (1, 2, 3, 4, 5)
⎵
```

---

### Pattern Matching on Lists

```elm
x :: xs = [1, 2, 3, 4, 5]

﹇
x :: y :: xs = [1, 2, 3, 4, 5]
⎵
```

---

### Pattern Matching on Records

```elm
person = { name = "John", lastname = "doe", age = 23 }
{ name, lastname } = person
```
---

### Patern Matching on Union Types

```elm
type alias Person = { name : String, lastname : String, age : Int }
﹇
type alias AuthUser = Maybe Person
-- type Maybe a = Just a | Nothing
⎵

﹇
helloUser : AuthUser -> String
helloUser authUser =
    case authUser of
⎵
﹇
        Just user ->
            "Hello " ++ user.name ++ " " user.lastname ++ "!"
⎵

﹇
        Nothing ->
            "User is not authenticated..."
⎵
```

---

```elm
type alias Person = { name : String, lastname : String, age : Int }
﹇
type State = Loading | Done Person | Error String
⎵

﹇
showState : State -> String
showState state =
    case state of
⎵
﹇
        Loading ->
            "Loading..."

﹇
        Done user ->
            "Hello " ++ u.name ++ " " u.lastname ++ "!"
⎵

﹇
        Error error ->
            "Error while fetching data: " ++ error
⎵
```

---

## Operators

---

### Function composition

```elm
-- <<

not << isEven << sqrt

﹇
-- >>

sqrt >> isEven >> not
⎵

﹇
one : a -> b
two : b -> c
three : c -> d
⎵

﹇
-- a -> d
three << two << one
one >> two >> three
⎵
```

---

### Pipe operators `|>` and `<|`

```elm
-- |>

String.join " " (List.reverse (String.words "Elm ❤️ I"))

﹇
"Elm ❤️ I"
    |> String.words
    |> List.reverse
    |> String.join " "
⎵

﹇
-- <|

text (toString (person.age ++ " year old"))
⎵

﹇
text <| toString <| person.age ++ " year old"
⎵
```

Note:
* Similar like Unix pipes, borrowed from F#
* Chain different functions when type signature match

---

tbd: create your own operators

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
