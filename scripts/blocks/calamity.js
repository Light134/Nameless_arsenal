const calamity = extend (ItemTurret, "calamity", {});


calamity.buildType = () =>
extendContent(ItemTurret.ItemTurretBuild, calamity, {
	overheat:0,
	heatcap:0,
	cooldown:true,
	toggle:false,
	t1 : 0,
	t2 : 0,
	updateTile(){
		this.super$updateTile();
		
		this.t1 = Mathf.lerpDelta(this.t1, this.heatcap / 10, 0.05 );
		this.t2 = Mathf.lerpDelta(this.t2, this.overheat / 360, 0.2 );
	
		this.overheat = Math.max(0, this.overheat -= Time.delta);
		this.heatcap = Math.max(0, this.heatcap);
		
		if(this.overheat >= 361) {
			this.toggle = true;
			this.overheat = 360;
			this.heatcap = 10;
		}
		else if(this.overheat == 0) {
			this.toggle = false;
			this.cooldown = true;
		} else this.cooldown = false;
		
		if(this.toggle && this.heatcap > 0) this.heatcap -= (Time.delta / 6);
		
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
			this.super$shoot(type);
			if(this.heatcap < 10) this.heatcap += 1
			else {
				this.overheat += 16
				this.heatcap = 10
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
