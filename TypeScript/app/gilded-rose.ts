enum ItemName {
  AgedBrie = 'Aged Brie',
  BackstagePasses = 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras = 'Sulfuras, Hand of Ragnaros'
}

const itemsNames = [ItemName.AgedBrie, ItemName.BackstagePasses, ItemName.Sulfuras];

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

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const isNotItemNamesAndPositiveQuality = !itemsNames.includes(item.name as ItemName) && item.quality > 0;
      if (isNotItemNamesAndPositiveQuality) {
        item.quality = item.quality - 1
      } else if (item.quality < 50) {
        item.quality = item.quality + 1
        if (item.name == ItemName.BackstagePasses && item.sellIn < 11) {
          item.quality = item.quality + 1
        }
      }
      if (item.name != ItemName.Sulfuras) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != ItemName.AgedBrie) {
          if (![ItemName.BackstagePasses, ItemName.Sulfuras].includes(item.name as ItemName) && item.quality > 0) {
              item.quality = item.quality - 1
          } else {
            item.quality = 0
          }
        } else if (item.quality < 50) {
          item.quality = item.quality + 1
        }
      }
    }

    return this.items;
  }
}
