# SASS

## Installation

https://sass-lang.com/install

### Avec node 

=>  npm install -g sass

### Ou en le téléchargeant 

=> https://github.com/sass/dart-sass/releases/tag/1.41.0
et en ajouter ce dossier à la source du projet
Video explicative https://www.youtube.com/watch?v=MOstrhqpIsI ( grafikart.fr)

### Convertir **scss** en **css**

En console, saisir =>
> sass leNomDeMonFichierSCSS.scss leNomDeMonNouveauFichierCSS.css --watch
> 
>> --watch sert à modifier automatiquement le css à chaque changement

et on charge le fichier **css** dans le code, classiquement dans le HEAD:

```html
<link rel="stylesheet" href="style.css">
````

Le fichier ***monFichier.css.map*** sert à retrouver dans le debugger du navigateur l'élément rechercé dans le fichier scss qui sera à supprimer dans le dévelopement.


## Utilisation de SASS

### Les commentaires

Pour les **commentaires**, on utilise 

// devant le commentaire si on ne veut pas qu'il soit compilé dans css ou

/* mon commentaire */ pour le retranscrire en css

### Utilité pour le **responive**

video https://www.youtube.com/watch?v=tnmGdg46LnM ( grafikart.fr) à 6mn environ.

On va créer un fichier responsive.scss, on définira les variables

````scss
$medium: 768px!default; /* !default par défaut si rien n'a été défini ailleurs*/
$large: 1000px!default;

$medium-up: "only screen ans (min-width: #{$medium});
$medium-down: "only screen ans (max-width: #{$medium});
$large-up: "only screen ans (min-width: #{$large});
$large-down: "only screen ans (max-width: #{$large});
````
 
et dans le fichier principal, on importera ce fichier en appelant les variables où il convient avec @media #{$medium-up}  {...} par exemple.

On peut redéfinir les variables dans le fichier principal.

Utilité pour **foncer les couleurs**

exemple sur 

````scss
$primary: #red;
.btn {
    &:hover {
    background: darken($primary, 10); /* pour 10% */
    }
}
````

## @mixin => partie de code qui sera répétée dans le code principal, comme une fonction

Documentation : [@mixin](https://sass-lang.com/documentation/at-rules/mixin) et

[les mixins - Grafikart](https://grafikart.fr/tutoriels/sass-mixins-1105#autoplay)

### TIPS "flèche"

Pour créer un triangle :

````css
    /* partie qui forme le triangle */
    border-top: 5px solid #fff;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    /* end */
````



Pour utiliser cette flèche à plusieurs endroit du code sans avoir à recopier l'ensemble, on crée une @mixin dans le fichier mixin.scss :

````scss
@mixin triangle ($color: #FFF, $size: 10px) {
    
    &::after {
    content:'',
    width: 0;
    height: 0;
    /* partie qui forme le triangle */
    border-top: $size solid $color;
    border-left: $size solid transparent;
    border-right: $size solid transparent;
    /* end */
    position: absolute;
    bottom: $size * -1;
    /* pour centrer la flèche au centre de la 'card' */
    left: calc(50% -#{$size});
    }
}
````

et dans le fichier scss où l'on souhaite importer le triangle :

````scss
@import "libs/mixins.scss";
````

et

````scss
.card {
    @extend %shadow;
    padding: 10px;
    border-radius: 3px;
    position: relative;
    background: #fff;
    @include triangle(#452486, 15px); /* pour importer notre triangle avec les variables que l'on souhaite*/
}
````

## Les fonctions

Il convient de créer un fichier **functions.scss** pour mieux organiser son code.

````scss
$base-font-size: 16px!default;

/* pour supprimer l'unité de la base car on ne peut pas diviser les pixels avec les rem */
@function strip-unit($number) {
    @if type-of($number) == 'number' and not unitless($number) {
      @return $number / ($number * 0 + 1);
    }
  
    @return $number;
}

/* pour convertir en rem */
@function rem($size, $base-font-size) {
    @return 1rem * $size / strip-unit(base);
}

@function em($size, $base-font-size) {
    @return 1em * $size / strip-unit(base);
}
````

Dans le fichier principal, on définit le **$base-font-size** en tête de notre fichier principal scss
exemple : $base-font-size: 16px; 

et où on souhaite l'utiliser :
ex : 

````scss
html, body {
    font-size: $base-font-size;
}
````

ou 

````scss
.card {
    padding: rem(5) rem(12); /* si la valeur est différente de celle par defaut, il faut l'ajouter : rem(5, 18)
}
```` 

## Les conditions avec @if

[Le préprocesseur SASS (7/11) : Les conditions](https://www.youtube.com/watch?v=GC2fMckVxAI)

Exemple pour calculer la luminosité d'un couleur et selon mettre une couleur foncée ou claire

````scss
%btn {
    padding: rem(5) rem(12);
    border-radius: 3px;
}

.btn {
    @extend %btn;
    text-decoration: none;
    background: $primary;
    @debug lightness($primary); // donnera en console par exemple Debug: 30.154874558
    @if (lightness($primary) > 50%) {
        color: #000;
    } else {
        color: #fff;
    }
}
````

=> si la couleur primaire est claire, l'écriture sera foncée #000 et si couleur primaire foncée, écriture #fff.

Pour voir le résultat de la fonction, on peut utiliser @debug 
On peut cumuler les conditions avec **and** 

## Les boucles

Tips : dans le cas de ce genre d'erreur en console 

````
Error: Expected "n".
   ╷
62 │             &:nth-child($i){
   │                         ^
````

il faut ajouter #{} à la variable. Ici ce sera: &:nth-child(#{$i}){

exemple pour rempacer 

````scss
span:nth-child(1) {
animation-delay: 120ms;
}
span:nth-child(2) {
    animation-delay: 240ms;
}
span:nth-child(3) {
    animation-delay: 360ms;
}
````

j'ai écrit avec **@for $i from 1 through 13 { }**

````scss
@for $i from 1 through 13 {
    &:nth-child(#{$i}) {
        animation-delay: 120ms * $i;
    };
}
````

### Tips pratique

et pour utiliser les marges commes dans bootstrap, pour remplacer le code 

````scss
.m-1 {
    margin: 0 0.25rem;
}
.m-2 {
    margin: 0 0.5rem;
}
.m-3 {
    margin: 0 0.75rem;
}
... etc
````

on écrira la fonction :

````scss
@for $i for 1 through 3 {
    .m-#{$si} {
        margin: 0 ($i * .25rem)
    }
}
````

### Pour les listes

Par exemple pour une liste d'icones

````scss
@each $animal in $animals {

    .icon-#{$animal} {

        background: url(img/#{anima}.png);
    }
}
````

$categories:
    chien #ff0000,
    chat #00ff00,
    poisson #0000ff;

@each $category in categories {

    .#{$category,1} {
        background: #{$category,2};
    }
    // ici 1 est le premier élément et prendra la valeur de l'animal, 2 la couleur associée
}

## La mise en prod

Pour la mise en production, notre code scss devra être converti en css plus compact que pour la phase de développement. 
Si on ecrit **sass** dans le terminal, on voit toutes les options possibles.
On a déjà vu -watch pour pour retranscrire en css automatiquement.
On va utiliser dans notre cas pour la prod le style 

````console
-s, --style=<NAME>             Output style.
                               [expanded (default), compressed]
````

expanded pour le développement
compressed pour la production

EN console, on écrira

````console
sass sass/monFichierSCSS.scss monFichierDeDestinationCSS.css --style=compressed --no-source-map 
````

-no-source-map => pour supprimer le source.map qui ne servira pas en prod

## Sur Windows, pour créer des executables de watch et compile(pour compressé le code)

[L'invite de commande](https://www.youtube.com/watch?v=QLgB-KQOtH8)
on crée un fichier compile.bat  :

````bat
sass sass/monFichierSCSS.scss monFichierDeDestinationCSS.css --style=compressed --no-source-map 
````

et pour **watch.bat**

````bat
sass sass/style.scss style.css --watch
````

Pour lancer le.bat on va dans le dossier et on double clique sur le fichier 