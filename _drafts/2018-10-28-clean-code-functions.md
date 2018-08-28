---
layout: post
title: "Clean Code: functions"
description: "In this post I will talk about clean code and functions."
date: 2018-10-28
image: /assets/images/posts/XXXXXXXX
tags: [clean code]
comments: true
seo:
 - type: "BlogPosting"
---

*In this post I will talk about clean code and functions.*

---

In a previous post I talked about [clean code](https://www.fabrizioduroni.it/2018/04/25/clean-code-objects-data-structures-law-demeter.html) and how much it is important to me. 
In this new post I will talk about another topic of the uncle bob clean code book: functions.  
How can we have write a good function/method? This is the list of the features that a function 
must have to be considered "good":

* Small
* Do one thing
* One level of abstraction
* Use descriptive names
* Low number of arguments
* Have no side effects
* Command Query Separation
* Prefer exception to error Codes
* "Don't repeat yourself"

Let's go deeper in the details of each one of these features.  
  
  
#### **Small**
What does Uncle Bob mean when he talks about "small" functions? How much small must be a function to be considered 
"small" in the clean code dictionary? Let's take a quote from his book *clean code*:

>In the eighties we used to say that a function should be no bigger than a screen-full. Of course we said that at a 
time when VT100 screens were 24 lines by 80 columns, and our editors used 4 lines for administrative purposes. 
Nowadays with a cranked-down font and a nice big monitor, you can fit 150 characters on a line and a 100 lines or 
more on a screen. Lines should not be 150 characters long. Functions should not be 100 lines long. Functions should 
hardly ever be 20 lines long. 

Honestly I think that also 20 lines are already too much. You must consider that most of the automated code quality 
tools available on the market consider a function of 20 lines too much long by default. Sometimes you will be 
tempted to break this rule :grin:, but remember: smaller functions will always be more readable. To write such small 
function you have to follow some simple rules:

* the body of every `if else` must be of one line (most of the time a call to another function)
* the body of every `for` loop must be of one line (most of the time a call to another function)
* the body of every `while` loop must be of one line (most of the time a call to another function)
* no nested structure
  
  
#### **Do one thing**
This is simple: function should do just one and only one thing. Uncle Bob wrote this phrase in his book:

>FUNCTIONS SHOULD DO ONE THING. THEY SHOULD DO IT WELL. THEY SHOULD DO IT ONLY.

But wait: how can we be sure that a function does just one thing? :cold_sweat: Our function doesn't do just one thing If
 we can extract other functions with a name and an implementation that is not a restatement of the implementation of 
 the current function.  
  
  
#### **One level of abstraction**
Our function must contains instruction that are at the same level of abstraction. Every instruction in a function 
must express a concept at the same level of the others contained in it. This basically means that we will have 
function/method with higher concept at the top level of our classes/programs, and by going deeper in the source code 
we will find functions/methods with lower concepts. This top-down relation between higher-lower level concept is 
called *The stepdown rule*. Uncle Bob described this rule very well (and it is basically a remark of the concept 
expresed in this paragraph):

>We want the code to read like a top-down narrative. We want every function to be followed by those at the next 
level of abstraction so that we can read the program, descending one level of abstraction at a time as we read down 
the list of functions. I call this The Stepdown Rule To say this differently, we want to be able to read the 
program as though it were a set of TO paragraphs, each of which is describing the current level of abstraction and 
referencing subsequent TO paragraphs at the next level down.
  
  
#### **Use descriptive names**
This feature for "clean function" it is strictly correlated to my previous post [clean code: meaningful names](/2017/09/11/clean-code-meaningful-names.html "clean code meaningful names"). 
There's one more thing that it is import to note: the most of the IDE available on the market today let the developer
 speed up their writing abilities with a lot of autocomplete and refactoring features (check out my [previous article](/2018/01/16/ide-refactoring-android-studio-xcode-appcode-webstorm-jetbrains.html "xcode android studio refactoring") 
 to better understand what I mean). So don't be afraid and use very long and expressive functions/methods name. Your 
 code will really become like a beautiful poem to read :heart_eyes:.
  
  
#### **Low number of arguments**
...     
 
 
#### **Have no side effects**


#### **Command Query Separation**


#### **Prefer exception to error Codes**


#### **"Don't repeat yourself"**


#### **Conclusion**         