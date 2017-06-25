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

---

## Beginner for Beginners

===

# Elm Language

Note:
* Inspired by Haskell
* Written in Haskell
* Compiles in JavaScript

---

### Hello World

```elm
hello name = "Hello " ++ name

﹇
hello "FP Meetup!"    -- "Hello FP Meetup!"
⎵
```

---

### Literals

```Elm
42    : number
3.14  : Float

'a'   : Char
"abc" : String

True  : Bool
False : Bool

"""
Multi-line
Strings
"""
```

---

### Arithmetic operators

```elm
23 + 19    -- 42 : number
2.0 + 1    --  3 : Float

6 * 7      -- 42 : number
10 * 4.2   -- 42 : Float

100 // 2   -- 50 : Int
1 / 2      -- 0.5 : Float
```

---

### if/else expressions

```elm
if True then "Foo" else "Bar"
```

```elm
if a == 1 then
    "Hello"
else if a == 2 then
    "World"
else
    "..."
```

---

### case .. of expression

```elm
case a of
    1 -> "Hello"
    2 -> "World"
    _ -> "..."
```

```elm
case currentUser of
    Just user ->
        "Hello " ++ user.name

    Nothing ->
        "no user..."
```

---

### Functions

```elm
square n = n ^ 2
```

```elm
react =
    let
        language = "Elm"
        reaction = "awesome"
    in
        language ++ " is " reaction
```

```elm
fib n =
    case n of
        0 -> 0
        1 -> 1
        _ -> fib (n - 1) + fib (n - 2)
```

---

### Lists


```elm
[1, 2, 3, 4]
1 :: [2, 3, 4]
1 :: 2 :: 3 :: 4 :: []
[1, 2] ++ [3, 4]
```

```elm
[1, 2, 3, 4]
    |> List.map ((*) 2)
    |> List.filter ((==) 4)
    |> List.length
```

```elm
case list of
    (head :: tail) -> tail ++ [head]
    [] -> []
```

---

### Tuples

```elm
(12, 34)
("John", 18, True)
```

```elm
Tuple.first (12, 34)                       -- 12
Tuple.second (12, 34)                      -- 34
```

```elm
(1, 2) |> Tuple.mapFirst (\x -> x * 2)     -- (2, 2)
(3, 4) |> Tuple.mapSecond (\x -> x ^ 2)    -- (3, 16)
```

---

### Records

```elm
person1 = { name = "John", lastname = "Doe" }
person2 = { name = "Jane", lastname = "Roe" }
```

```elm
person1.name ++ " " ++ person1.lastname
-- "John Doe"
```

```elm
List.map .name [person1, person2]
-- ["John", "Jane"]
```

```elm
{ person1 | name = "Jondo" }

{ person1
    | name = "First"
    , lastname = "Last"
}
```

---

### Union (Sum) Types

```elm
type Action = Increment | Decrement | Reset
```

```elm
type Person = Person String String Int

Person "John" "Doe" 21
```

```elm
type Bool = True | False
```

```elm
type Maybe = Just a | Nothing
```

```elm
type Tree a
    = Empty
    | Node a (Tree a) (Tree a)
```

---

### Pipe operators `|>` and `<|`

`|>`
```elm
String.join " " (List.reverse (String.words "Elm ❤️ I"))
```

```elm
"Elm ❤️ I"
    |> String.words
    |> List.reverse
    |> String.join " "
```

`<|`
```elm
text (toString (person.age ++ " year old"))
```

```
text <| toString <| person.age ++ " year old"
```

Note:
* Similar like Unix pipes, borrowed from F#
* Chain different functions when type signature match

---

### Function composition

`<<`
```elm
not << isEven << sqrt
```

`>>`
```elm
sqrt >> isEven >> not
```

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
type Msg = Increment

update msg model =
    case msg of
        Increment ->
            model + 1
```

---

### View

```elm
view model =
    div []
        [ div [] [ text <| toString model ]
        , button [ onClick Increment ] [ text "Increment" ]
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

# No more `undefined` is not a function!!!

===

# Demo Videos
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
