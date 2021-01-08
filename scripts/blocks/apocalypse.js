const apocalypse = extendContent(ItemTurret, "apocalypse", {});


apocalypse.buildType = () =>
extendContent(ItemTurret.ItemTurretBuild, apocalypse, {
	overheat:0,
	heatcap:0,
	cooldown:true,
	toggle:false,
	t1 : 0,
	t2 : 0,
	updateTile(){
		this.super$updateTile();
		
		this.t1 = Mathf.lerpDelta(this.t1, this.heatcap / 20, 0.05 );
		this.t2 = Mathf.lerpDelta(this.t2, this.overheat / 450, 0.2 );
	
		this.overheat = Math.max(0, this.overheat -= Time.delta);
		this.heatcap = Math.max(0, this.heatcap);
		
		if(this.overheat >= 451) {
			this.toggle = true;
			this.overheat = 450;
			this.heatcap = 20;
		}
		else if(this.overheat == 0) {
			this.toggle = false;
			this.cooldown = true;
		} else this.cooldown = false;
		
		if(this.toggle && this.heatcap > 0) this.heatcap -= (Time.delta / 3);
		
		if(!this.toggle && this.cooldown && this.heatcap > 0) this.heatcap -= (Time.delta / 60);
		
	},
	drawSelect(){
		this.super$drawSelect();
		Lines.stroke(this.t1 * 1);
		Draw.color(Color.valueOf("8aa3f4"));
		Lines.polySeg(200, 0, 200*this.t1, this.x, this.y, 1.5*8, this.rotation);
		Lines.stroke(this.t2 * 2);
		Draw.color(Color.valueOf("ffa665"));
		Lines.polySeg(200, 0, 200*this.t2, this.x, this.y, 1.5*8, this.rotation);
		
		Draw.color();
	},
	
	
	shoot(type){
		if(!this.toggle) {
			var i = (this.shotCounter % apocalypse.shots) - (apocalypse.shots-1)/2;
			apocalypse.tr.trns(this.rotation - 90, apocalypse.spread * i + Mathf.range(apocalypse.xRand), apocalypse.size * Vars.tilesize / 2);
			this.bullet(type, this.rotation + Mathf.range(apocalypse.inaccuracy));
			this.shotCounter++;
			this.recoil = apocalypse.recoilAmount;
			this.heat = 1;
			this.effects();
			this.useAmmo();
			if(this.heatcap < 20) this.heatcap += 1
			else {
				this.overheat += 7
				this.heatcap = 20
			}
		}
    },
	updateShooting(){
		if(this.toggle) return;
		this.super$updateShooting()
	},
	baseReloadSpeed(){
		return this.efficiency() * (1 + (this.heatcap/10));
	}
});
