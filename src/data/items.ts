export const initialItems = [
	{icon: '🍎', name: 'Apple', type: 'consumable', description: 'Recupera a vida.', attrib:{life:5} },
	{icon: '🍌', name: 'Banana', type: 'consumable', description: 'Recupera a vida.', attrib:{life:5} },
	{icon: '🔧', name: 'Wrench', type: 'weapon', description: 'Equipamento.', attrib: {power:1}},
	{icon: '🔨', name: 'Hammer', type: 'weapon', description: 'Equipamento.', attrib: {power:2}},
	{icon: '🏹', name: 'Bow', type: 'weapon', description: 'Equipamento.', attrib: {power:2}},
	{icon: '🔪', name: 'Knife', type: 'weapon', description: 'Equipamento.', attrib: {power:3}},
	{icon: '🗡️', name: 'Sword', type: 'weapon', description: 'Equipamento.', attrib: {power:4}},
	{icon: '🔫', name: 'Revolver', type: 'weapon', description: 'Equipamento.', attrib: {power:5}},
	{icon: '👕', name: 'Shirt', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
	{icon: '👖', name: 'Jeans', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
	{icon: '👔', name: 'Formal Shirt', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
	{icon: '👘', name: 'Kimono', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
	{icon: '💼', name: 'Mallet', type: 'misc', description: 'Equipamento.', attrib: {guard:1}},
	{icon: '🎒', name: 'Backpack', type: 'misc', description: 'Equipamento.', attrib: {guard:1}},
	{},{},{},{},{},{},{},{},{},{},{}
]

const items = {
	"equip": {
		"weapon": {
			"wrench": "🔧",
			"chain": "⛓",
			"hammer": "🔨",
			"hammer&wrench": "🛠",
			"double hammer": "⚒",
			"pickaxe": "⛏",
			"knife": "🔪",
			"sword": "🗡",
			"double sword": "⚔️",
			"bow%arrow": "🏹",
			"revolver": "🔫"
		},
		"cloth": {
			"shirt": "👕",
			"pant": "👖",
			"formal shirt": "👔",
			"dress": "👗",
			"silk shirt": "👚",
			"bikini": "👙",
			"kimono": "👘"
		},
		"misc": {
			"hand": {
				"handbag": "👜",
				"mallet": "💼",
				"coin purse": "👛",
				"shield": "🛡",
				"pencil": "✏️",
				"scissor": "✂️",
				"umbrella": "☂️",
				"flashlight": "🔦",
				"bomb": "💣",
				"juzu": "📿",
				"bell": "🔔",
				"termometer": "🌡"
			},
			"face": {
				"glasses": "👓",
				"sunglasses": "🕶"
			},
			"head": {
				"crown": "👑",
				"ribbon hat": "👒",
				"top hat": "🎩",
				"graduate hat": "🎓",
				"helmet": "⛑"
			},
			"feet": {
				"shoes": "👞",
				"sneakers": "👟",
				"high heels": "👠",
				"sandals": "👡",
				"boots": "👢"
			},
			"etc": {
				"backpack": "🎒",
				"jewel ring": "💍",
				"watch": "⌚️"
			}
		}
	},
	"consumable": {
		"chemistry": {
			"soup": "🍵",
			"cigar": "🚬",
			"medicine": "💊",
			"injection": "💉",
			"coffee": "☕️",
			"beer": "🍺",
			"wine": "🍷",
			"mojito": "🍸",
			"caipirinha": "🍹",
			"champagne": "🍾"
		},
		"food": {
			"natural": {
				"apple": "🍎",
				"banana": "🍌",
				"orange": "🍊",
				"grape": "🍇",
				"lemon": "🍋",
				"peach": "🍑",
				"tomato": "🍅",
				"corn": "🌽",
				"eggplant": "🍆",
				"pepper": "🌶",
				"mushroom": "🍄",
				"nut": "🌰"
			},
			"artificial": {
				"honey": "🍯",
				"bread": "🍞",
				"meat": "🍗",
				"steak": "🍖",
				"cheese": "🧀",
				"pizza": "🍕"
			}
		},
		"book": {
			"diary": "📓",
			"notebook": "📒",
			"manual": "📔",
			"science vol.1": "📕",
			"science vol.2": "📗",
			"science vol.3": "📘",
			"science vol.4": "📙",
			"book collection": "📚"
		},
		"tool": {
			"key": "🔑",
			"antique key": "🗝",
			"package": "📦",
			"lockpick": "📎",
			"double lockpick": "🖇",
			"battery": "🔋",
			"locker": "🔒"
		}
	}
}