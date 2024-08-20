enum ItemName {
  AgedBrie = 'Aged Brie',
  BackstagePasses = 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras = 'Sulfuras, Hand of Ragnaros',
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

  calculateQuality(item: Item) {
    let {name, quality, sellIn} = item;
    const doesntIncludeKnownNamesAndPositiveQuality = !knownItemNames.includes(name as ItemName) && quality > 0;
    if (doesntIncludeKnownNamesAndPositiveQuality) {
      quality = quality - 1
      return item.quality;
    }

    if (quality < 50) {
      quality = quality + 1
      if (name == ItemName.BackstagePasses && sellIn < 11) {
        quality = quality + 1
      }
      return item.quality;
    }

    return item.quality;
  }

  updateQuality() {
    for (let item of this.items) {
      let {name, quality, sellIn} = item;
      sellIn = name != ItemName.Sulfuras ? sellIn - 1 : sellIn;

      quality = this.calculateQuality(item);

      const doesntIncludeKnownNamesAndPositiveQuality = !knownItemNames.includes(name as ItemName) && quality > 0;

      if (sellIn < 0) {
        if (name != ItemName.AgedBrie) {0
          quality = doesntIncludeKnownNamesAndPositiveQuality ? quality - 1 : 0;
        } else if (quality < 50) {
          quality = quality + 1
        }
      }
    }

    return this.items;
  }
}
