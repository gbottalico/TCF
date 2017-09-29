const mongoose = require('mongoose');

const MenuEntrySchema = mongoose.Schema({
	_id: {
		type: Number,
		required: true
  },
  title_menu:{
		type: String,
		required: true
	},
	desc_menu:{
		type: String,
		required: false
		},
	parent_id:{
		type: Number,
		required: false,
		default: 0
  }, 
  url:{
		type: String,
		required: true,
		default: "#"
    },
  profile:{
		type: String,
		required: true
	},
	children_menu:{
		type: [mongoose.Schema.Types.MenuEntry],
		required: false
	},
	ord_vis:{
		type: String,
		required: true
	},
	data_inizio_validita:{
		type: Date,
		required: true,
	},
	data_fine_validita:{
		type: Date,
		required: false
	}
});

const MenuEntry = module.exports = mongoose.model('MenuEntry', MenuEntrySchema); 