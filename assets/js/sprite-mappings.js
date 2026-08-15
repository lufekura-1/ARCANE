(function(){
  // Lightweight placeholder assets for Codex-friendly diffs.
  const ITEM_ICON_OVERRIDES_V123 = {
  "wood_arrow": "assets/images/equipment/arrow.png",
  "iron_arrow": "assets/images/equipment/arrow.png",
  "steel_arrow": "assets/images/equipment/arrow.png",
  "explosion_arrow": "assets/images/equipment/arrow.png",
  "hunting_bow": "assets/images/equipment/bow.png",
  "oak_bow": "assets/images/equipment/bow.png",
  "composite_bow": "assets/images/equipment/bow.png",
  "royal_bow": "assets/images/equipment/bow.png",
  "holy_bow": "assets/images/equipment/bow.png",
  "dragon_bow": "assets/images/equipment/bow.png",
  "medusa_bow": "assets/images/equipment/bow.png",
  "ghost_bow": "assets/images/equipment/bow.png",
  "wood_bow": "assets/images/equipment/bow.png",
  "player_bow": "assets/images/equipment/bow.png",
  "sacred_bow": "assets/images/equipment/bow.png",
  "soldier_sword": "assets/images/equipment/sword.png",
  "iron_sword": "assets/images/equipment/sword.png",
  "knight_sword": "assets/images/equipment/sword.png",
  "royal_sword": "assets/images/equipment/sword.png",
  "holy_blade": "assets/images/equipment/sword.png",
  "wooden_shield": "assets/images/equipment/shield.png",
  "iron_shield": "assets/images/equipment/shield.png",
  "guardian_shield": "assets/images/equipment/shield.png",
  "dragon_shield": "assets/images/equipment/shield.png",
  "medusa_shield": "assets/images/equipment/shield.png",
  "ghost_shield": "assets/images/equipment/shield.png",
  "sacred_shield": "assets/images/equipment/shield.png",
  "player_sword": "assets/images/equipment/sword.png",
  "royal_shield": "assets/images/equipment/shield.png",
  "divine_shield": "assets/images/equipment/shield.png",
  "leather_helmet": "assets/images/equipment/helmet.png",
  "leather_armor": "assets/images/equipment/armor.png",
  "leather_legs": "assets/images/equipment/legs.png",
  "leather_boots": "assets/images/equipment/boots.png",
  "iron_helmet": "assets/images/equipment/helmet.png",
  "chain_armor": "assets/images/equipment/armor.png",
  "chain_legs": "assets/images/equipment/legs.png",
  "steel_boots": "assets/images/equipment/boots.png",
  "steel_helmet": "assets/images/equipment/helmet.png",
  "royal_armor": "assets/images/equipment/armor.png",
  "royal_legs": "assets/images/equipment/legs.png",
  "ranger_boots": "assets/images/equipment/boots.png",
  "halo_helmet": "assets/images/equipment/helmet.png",
  "guardian_armor": "assets/images/equipment/armor.png",
  "guardian_legs": "assets/images/equipment/legs.png",
  "guardian_boots": "assets/images/equipment/boots.png",
  "blessed_helmet": "assets/images/equipment/helmet.png",
  "blessed_armor": "assets/images/equipment/armor.png",
  "blessed_legs": "assets/images/equipment/legs.png",
  "blessed_boots": "assets/images/equipment/boots.png",
  "cloth_legs": "assets/images/equipment/legs.png",
  "travel_boots": "assets/images/equipment/boots.png",
  "knight_armor": "assets/images/equipment/armor.png",
  "guardian_helmet": "assets/images/equipment/helmet.png",
  "chain_helmet": "assets/images/equipment/helmet.png",
  "dragon_helmet": "assets/images/equipment/helmet.png",
  "dragon_armor": "assets/images/equipment/armor.png",
  "dragon_legs": "assets/images/equipment/legs.png",
  "dragon_boots": "assets/images/equipment/boots.png",
  "medusa_helmet": "assets/images/equipment/helmet.png",
  "medusa_armor": "assets/images/equipment/armor.png",
  "medusa_legs": "assets/images/equipment/legs.png",
  "medusa_boots": "assets/images/equipment/boots.png",
  "ghost_helmet": "assets/images/equipment/helmet.png",
  "ghost_armor": "assets/images/equipment/armor.png",
  "ghost_legs": "assets/images/equipment/legs.png",
  "ghost_boots": "assets/images/equipment/boots.png",
  "sacred_helmet": "assets/images/equipment/helmet.png",
  "sacred_armor": "assets/images/equipment/armor.png",
  "sacred_legs": "assets/images/equipment/legs.png",
  "sacred_boots": "assets/images/equipment/boots.png",
  "health_potion": "assets/images/equipment/potion_hp.png",
  "mana_potion": "assets/images/equipment/potion_mp.png",
  "backpack": "assets/images/ui/backpack.png",
  "copper_ring": "assets/images/equipment/ring.png",
  "silver_ring": "assets/images/equipment/ring.png",
  "ruby_ring": "assets/images/equipment/ring.png",
  "royal_ring": "assets/images/equipment/ring.png",
  "winged_helm_relic": "assets/images/equipment/helmet.png",
  "rope_necklace": "assets/images/equipment/amulet.png",
  "bronze_amulet": "assets/images/equipment/amulet.png",
  "sapphire_amulet": "assets/images/equipment/amulet.png",
  "sun_amulet": "assets/images/equipment/amulet.png",
  "shadow_amulet": "assets/images/equipment/amulet.png",
  "divine_amulet": "assets/images/equipment/amulet.png",
  "seraph_ring": "assets/images/equipment/ring.png",
  "emerald_ring": "assets/images/equipment/ring.png",
  "sacred_ring": "assets/images/equipment/ring.png",
  "sun_ring": "assets/images/equipment/ring.png",
  "dark_amulet": "assets/images/equipment/amulet.png",
  "divine_necklace": "assets/images/equipment/amulet.png"
};
  const previousPixelIconDataV123 = window.pixelIconData;
  window.pixelIconData = function(type){
    if(ITEM_ICON_OVERRIDES_V123[type]) return ITEM_ICON_OVERRIDES_V123[type];
    return previousPixelIconDataV123 ? previousPixelIconDataV123(type) : '';
  };
  function refreshIconsV123(root){
    (root || document).querySelectorAll('[data-pixel-icon]').forEach(function(el){
      const type = el.getAttribute('data-pixel-icon');
      if(ITEM_ICON_OVERRIDES_V123[type]){
        el.style.backgroundImage = 'url(' + ITEM_ICON_OVERRIDES_V123[type] + ')';
        el.style.backgroundSize = 'contain';
        el.style.backgroundPosition = 'center';
        el.style.backgroundRepeat = 'no-repeat';
      }
    });
  }
  const oldHydrateV123 = window.hydratePixelIcons;
  window.hydratePixelIcons = function(root){
    if(oldHydrateV123) oldHydrateV123(root || document);
    refreshIconsV123(root || document);
  };
  ['openScene','renderShop','renderHero','renderSmith','renderBackpack','renderTrainer'].forEach(function(name){
    const old = window[name];
    if(typeof old === 'function'){
      window[name] = function(){
        const result = old.apply(this, arguments);
        setTimeout(function(){ refreshIconsV123(document); }, 20);
        return result;
      }
    }
  });
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(function(){refreshIconsV123(document);}, 50); });
  setTimeout(function(){refreshIconsV123(document);}, 80);
})();
