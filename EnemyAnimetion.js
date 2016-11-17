//=============================================================================
// Sprite_Enemy メソッド拡張
//=============================================================================
Sprite_Enemy.prototype.initMembers = function() {
    Sprite_Battler.prototype.initMembers.call(this);
    this._enemy = null;
    this._appeared = false;
    this._battlerName = '';
    this._battlerHue = 0;
    this._effectType = null;
    this._effectDuration = 0;
    this._shake = 0;
    this._spriteCnt = 0;
    this._sleepCnt = 0;
    this.createStateIconSprite();
};

Sprite_Enemy.prototype.updateBitmap = function() {
    Sprite_Battler.prototype.updateBitmap.call(this);
    var enemy = $dataEnemies[this._enemy._enemyId];
    var name = this._enemy.battlerName();
    var hue = this._enemy.battlerHue();
    if (this._battlerName !== name || this._battlerHue !== hue || (enemy.meta.animetion && enemy.meta.baseName)) {
            if(enemy.meta.animetion && enemy.meta.baseName){
                if(this._sleepCnt > 5){
                    this._spriteCnt = enemy.meta.animetion > this._spriteCnt ? ++this._spriteCnt : 0;
                    this._sleepCnt = 0;
                }else{
                    this._sleepCnt++;
                }
                var baseNm = enemy.meta.baseName;
                name = baseNm + (this._spriteCnt > 0 ? this._spriteCnt : "");
            }
        this._battlerName = name;
        this._battlerHue = hue;
        this.loadBitmap(name, hue);
        this.initVisibility();
    }
};