const mjollnir = extend(PowerTurret, "mjollnir", {});

var fullTime = 0;
var isDpUpdateA, isDpUpdate;

mjollnir.shootType = new LightningBulletType();

    mjollnir.shootType.damage = 12;
    mjollnir.shootType.lightningLength = 22;
    mjollnir.shootType.lightningColor = Color.valueOf("a9d8ff"); 
    mjollnir.shootType.collidesAir = false;


mjollnir.buildType = () => extendContent(PowerTurret.PowerTurretBuild, mjollnir, {
    shoot(ammo) {

        mjollnir.tr.trns(this.rotation, mjollnir.size * Vars.tilesize / 2);
        mjollnir.chargeBeginEffect.at(this.x + mjollnir.tr.x, this.y + mjollnir.tr.y, this.rotation);

        for (var i = 0; i < mjollnir.chargeEffects; i++) {
            Time.run(Mathf.random(mjollnir.chargeMaxDelay), () => {
                if (!this.isValid()) return;
                mjollnir.tr.trns(this.rotation, mjollnir.size * Vars.tilesize / 2);
                mjollnir.chargeEffect.at(this.x + mjollnir.tr.x, this.y + mjollnir.tr.y, this.rotation);
            });
        }

        this.charging = true;

        for (var i = 0; i < mjollnir.shots; i++) {
            Time.run(mjollnir.burstSpacing * i, () => {
                Time.run(mjollnir.chargeTime, () => { //burst charge go brrrrr
                    if (!this.isValid() || !this.hasAmmo()) return;


                    mjollnir.tr.trns(this.rotation, mjollnir.size * Vars.tilesize / 2.7, Mathf.range(mjollnir.xRand));
                    this.bullet(ammo, this.rotation + Mathf.range(mjollnir.inaccuracy));
                    this.effects();
                    this.useAmmo();
                    this.recoil = mjollnir.recoilAmount;
                    this.heat = 1;

                    this.charging = false;
                });
            });
        }
    },
    updateTile() {
        this.super$updateTile();
        isDpUpdateA = this.isActive() ? Mathf.floorPositive(Time.time%6) == 0 && fullTime <= 1200 ? 0 : 1 : 2;
        fullTime = isDpUpdateA < 2 ? fullTime + 1 : 0;
        isDpUpdate = isDpUpdateA < 2 ? true : false;
        //-----------------------------------------------------------------------------
        //print("isDpUpdateA: " + isDpUpdateA);
        // print("fullTime: " + fullTime);
        //  print("isDpUpdate: " + isDpUpdate);
        // print("damage: " + mjollnir.shootType.damage);
        if(isDpUpdate){
            mjollnir.shootType.damage += 0.02
        }
        else{
            mjollnir.shootType.damage = 12;
        }
        //-----------------------------------------------------------------------------
        // this.shootType = extend(LightningBulletType, {
        //     hit(b){
        //         this.super$update(b);
        //         if(isDpUpdate){
        //             for(var i = 0; i < 256; i++){
        //                 //-------------------------------------------------------------
        //                 print("this.team.all[" + i + "]: " + this.team.all[i]);
        //                 print("this.team: " + this.team);
        //                 //-------------------------------------------------------------
        //                 if(this.team.all[i] =! this.team){
        //                     Damage.damage(this.team.all[i], b.x, b.y, 1, fullTime*0.02, false, false, true);
        //                     print("데미지:" + fullTime*0.02);
        //                 }
        //             }
        //         }
        //     }
        // });
    }
});