// ---- Supporting Interfaces ----

interface CardSet {
    id: string;
    name: string;
    logo: string;
    symbol: string;
    cardCount: {
      official: number;
      total: number;
    };
  }
  
  interface CardVariants {
    firstEdition: boolean;
    holo: boolean;
    normal: boolean;
    reverse: boolean;
    wPromo: boolean;
  }
  
  interface CardLegal {
    standard: boolean;
    expanded: boolean;
  }
  
  interface CardAttack {
    cost: string[];
    name: string;
    effect?: string;
    damage?: number;
  }
  
  interface CardWeakness {
    type: string;
    value: string;
  }
  
  // ---- Main Class ----
  
  export default class CardPokemon {
    private category: string;
    private id: string;
    private name: string;
    private hp: number;
    private types: string[];
    private stage: string;
    private description: string;
    private evolveFrom?: string;
    private rarity: string;
    private image: string;
    private illustrator: string;
    private localId: string;
    private retreat: number;
    private regulationMark: string;
  
    private set: CardSet;
    private variants: CardVariants;
    private legal: CardLegal;
  
    private attacks: CardAttack[];
    private weaknesses: CardWeakness[];
  
    constructor(data: {
      category: string;
      id: string;
      name: string;
      hp: number;
      types: string[];
      stage: string;
      description: string;
      evolveFrom?: string;
      rarity: string;
      image: string;
      illustrator: string;
      localId: string;
      retreat: number;
      regulationMark: string;
      set: CardSet;
      variants: CardVariants;
      legal: CardLegal;
      attacks: CardAttack[];
      weaknesses: CardWeakness[];
    }) {
      this.category = data.category;
      this.id = data.id;
      this.name = data.name;
      this.hp = data.hp;
      this.types = data.types;
      this.stage = data.stage;
      this.description = data.description;
      this.evolveFrom = data.evolveFrom;
      this.rarity = data.rarity;
      this.image = data.image;
      this.illustrator = data.illustrator;
      this.localId = data.localId;
      this.retreat = data.retreat;
      this.regulationMark = data.regulationMark;
  
      this.set = data.set;
      this.variants = data.variants;
      this.legal = data.legal;
  
      this.attacks = data.attacks;
      this.weaknesses = data.weaknesses;
    }
  
    getCategory(): string {
      return this.category;
    }
  
    getId(): string {
      return this.id;
    }
  
    getName(): string {
      return this.name;
    }

    getDescription(): string {
        return this.description;
    }
  
    getSetID(): string {
      return this.set.id;
    }

    getCardImage(): string {
        return this.image;
    }
  }