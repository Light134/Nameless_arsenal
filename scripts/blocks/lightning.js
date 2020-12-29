const lightning = extend(PowerTurret, "lightning", {});

const lightningBuild = () => extendContent(PowerTurret.PowerTurretBuild, lightning, {
    shoot(ammo){

        lightning.tr.trns(this.rotation, lightning.size * Vars.tilesize / 2);
        lightning.chargeBeginEffect.at(this.x + lightning.tr.x, this.y + lightning.tr.y, this.rotation);

        for(var i = 0; i < lightning.chargeEffects; i++){
            Time.run(Mathf.random(lightning.chargeMaxDelay), () => {
                if(!this.isValid()) return;
                lightning.tr.trns(this.rotation, lightning.size * Vars.tilesize / 2);
                lightning.chargeEffect.at(this.x + lightning.tr.x, this.y + lightning.tr.y, this.rotation);
            });
        }

        this.charging = true;

        for(var i = 0; i < lightning.shots; i++){
            Time.run(lightning.burstSpacing * i, () => {
                Time.run(lightning.chargeTime, () => { //burst charge go brrrrr
                    if(!this.isValid() || !this.hasAmmo()) return;


                    lightning.tr.trns(this.rotation, lightning.size * Vars.tilesize / 2.7, Mathf.range(lightning.xRand));
                    this.bullet(ammo, this.rotation + Mathf.range(lightning.inaccuracy));
                    this.effects();
                    this.useAmmo();
                    this.recoil = lightning.recoilAmount;
                    this.heat = 1;

                    this.charging = false;
                });
            });
        }
	}
});
lightning.buildType = lightningBuild;