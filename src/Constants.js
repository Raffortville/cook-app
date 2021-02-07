export const navFieldIn = [

    {name:"VOIR FICHES",icon:"article",link:"/search"},
    {name:"CREER FICHES",icon:"create",link:"/formFiche"},
    {name:"DECONNEXION",icon:"error_outline",link:"/logout"}
]

export const navFieldOut = [

    {name:"S'IDENTIFIER",icon:"person_add",link:"/login"},
    {name:"CREER COMPTE",icon:"login",link:"/signup"}

]

export const iconActionsParent = [

    {action:"ajouter",icon:"add_circle_outline",class:"iconGreen"},
    {action:"supprimer",icon:"delete_forever",class:"iconRed"},
    {action:"modifier",icon:"create",class:"icon"}
]


export const iconActionsChild = [

    {action:"supprimer",icon:"delete_forever",class:"iconRed"},
    {action:"modifier",icon:"create",class:"icon"}
]

export const iconListFiche = [

    {title:"voir la recette",icon:"visibility",action:"voir"},
    {title:"modifier la fiche technique",icon:"create",action:"modifier"},
    {title:"supprimer la fiche tecnhique", icon:"delete_forever",action:"supprimer"}
]

export const searchByField = [

    {title:"Afficher par noms",type:"nom",check:true},
    { title:"Afficher par catégories",type:"categorie",check:false},
    { title:"Afficher par cuissons",type:"cuisson",check:false}
]


export const titleCreateUser =  "CREER VOTRE COMPTE";

export const titleIdentifyUser = "IDENTIFIEZ-VOUS"

export const categories = ["Velouté, soupe, potage","Sauce, fond, jus","Hors d'oeuvre froid","Hors d'oeuvre chaud","Oeufs","Poissons & mer","Viandes","Volailles","Garnitures","Desserts"]

export const cuissons = ["Pocher","Etuver","Glacer","Sauter","Griller","Rôtir","Poeler","Frire","Braiser","Ragout,Confire"]