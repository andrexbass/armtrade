import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'

Meteor.methods({
    'webshot.snap' (params) {
    	var options = { 
			phantomPath: '/usr/bin/phantomjs',
			siteType: 'html',
			customCSS: params.css,
			defaultWhiteBackground: true,
			screenSize: {
			    width: 600,
			    height: 300
			}, 
			shotSize: {
				width: 'window',
			    height: 300
			}, 
			userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
		}
		webshot(params.html, "/home/andre/tmp/"+Random.id()+".png", options, function (err) {
			if (err != null) {
				console.log(err);
			} else {
				console.log('imagem salva com sucesso');
			}
		});
    }
});