const calamity = extend (ItemTurret, "calamity", {});


calamity.buildType = () =>
extendContent(ItemTurret.ItemTurretBuild, calamity, {
	overheat:0,
	heatcap:0,
	cooldown:true,
	toggle:false,
	updateTile(){
		this.super$updateTile();
		
		this.overheat = Math.max(0, this.overheat -= Time.delta);
		this.heatcap = Math.max(0, this.heatcap);
		
		if(this.overheat >= 301) {
			this.toggle = true;
			this.overheat = 240;
			this.heatcap = 10;
		}
		else if(this.overheat == 0) {
			this.toggle = false;
			this.cooldown = true;
		} else this.cooldown = false;
		
		if(this.toggle && this.heatcap > 0) this.heatcap -= (Time.delta / 2);
		
		if(!this.toggle && this.cooldown && this.heatcap > 0) this.heatcap -= (Time.delta / 30);
		
		print("overheat: " + this.overheat)
		print("heatcap: " + this.heatcap)
		
	},
	
	shoot(type){
		if(!this.toggle) {
			this.super$shoot(type);
			if(this.heatcap < 10) this.heatcap += 1
			else {
				this.overheat += 21
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
