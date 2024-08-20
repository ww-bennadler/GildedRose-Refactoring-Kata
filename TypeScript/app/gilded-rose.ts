enum ItemName {
  AgedBrie = 'Aged Brie',
  BackstagePasses = 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras = 'Sulfuras, Hand of Ragnaros'
}

const knownItemNames = [ItemName.AgedBrie, ItemName.BackstagePasses, ItemName.Sulfuras];

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  calculateQuality({ item, notInKnownNamesAndPositiveQuality }) {
    let { name, quality, sellIn } = item ?? {};
    if (notInKnownNamesAndPositiveQuality) {
      quality = quality - 1
    } else if (quality < 50) {
      quality = quality + 1
      if (name == ItemName.BackstagePasses && sellIn < 11) {
        quality = quality + 1
      }

      if (name == ItemName.BackstagePasses && sellIn < 6) {
        quality = quality + 1
      }
    }

    return quality;
  }

  updateQuality() {
    for (let item of this.items) {
      let { name, quality, sellIn } = item ?? {};
      const notInKnownNamesAndPositiveQuality = !knownItemNames.includes(name as ItemName) && quality > 0;
      sellIn = name != ItemName.Sulfuras ? sellIn - 1 : sellIn;
      quality = this.calculateQuality({ item, notInKnownNamesAndPositiveQuality });

      if (sellIn < 0) {
        if (name != ItemName.AgedBrie) {
          quality = notInKnownNamesAndPositiveQuality ? quality - 1 : 0;
        } else if (quality < 50) {
            quality = quality + 1
        }
      }
    }

    return this.items;
  }
}
