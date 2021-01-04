const disaster = extend (ItemTurret, "disaster", {});


disaster.buildType = () =>
extendContent(ItemTurret.ItemTurretBuild, disaster, {
	overheat:0,
	heatcap:0,
	cooldown:true,
	toggle:false,
	t1 : 0,
	t2 : 0,
	updateTile(){
		this.super$updateTile();
		
		this.t1 = Mathf.lerpDelta(this.t1, this.heatcap / 5, 0.05 );
		this.t2 = Mathf.lerpDelta(this.t2, this.overheat / 180, 0.2 );
	
		this.overheat = Math.max(0, this.overheat -= Time.delta);
		this.heatcap = Math.max(0, this.heatcap);
		
		if(this.overheat >= 181) {
			this.toggle = true;
			this.overheat = 180;
			this.heatcap = 5;
		}
		else if(this.overheat == 0) {
			this.toggle = false;
			this.cooldown = true;
		} else this.cooldown = false;
		
		if(this.toggle && this.heatcap > 0) this.heatcap -= (Time.delta / 30);
		
		if(!this.toggle && this.cooldown && this.heatcap > 0) this.heatcap -= (Time.delta / 60);
		
	},
	drawSelect(){
		Lines.stroke(this.t1 * 1);
		Draw.color(Color.valueOf("8aa3f4"));
		Lines.polySeg(200, 0, 200*this.t1, this.x, this.y, 1.5*8, 0);
		Lines.stroke(this.t1 * 2);
		Draw.color(Color.valueOf("ffa665"));
		Lines.polySeg(200, 0, 200*this.t2, this.x, this.y, 1.5*8, 0);
		
		Draw.color();
	},
	
	
	shoot(type){
		if(!this.toggle) {
			this.super$shoot(type);
			if(this.heatcap < 5) this.heatcap += 1
			else {
				this.overheat += 16
				this.heatcap = 5
			}
		}
    },
	updateShooting(){
		if(this.toggle) return;
		this.super$updateShooting()
	},
	baseReloadSpeed(){
		return this.efficiency() * (1 + (this.heatcap/5));
	}
});
