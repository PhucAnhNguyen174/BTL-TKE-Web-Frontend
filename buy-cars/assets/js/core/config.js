// Curated car catalogue - Ferrari Collection (Part 1 of 5)
const cars = [
    {
        id: 1,
        brand: "Ferrari",
        name: "Ferrari F40",
        years: "1987-1992",
        tagline: "Legendary Supercar - Collector's Icon",
        type: "supercar",
        category: "collector",
        price: 2500000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "3.8 s" },
            { label: "Top Speed", value: "324 km/h (201 mph)" },
            { label: "Power", value: "478 hp @ 7,000 rpm" },
            { label: "Torque", value: "577 Nm @ 4,000 rpm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "14-16 L/100 km" },
            { label: "Transmission", value: "5-speed manual (RWD)" }
        ],
        technical: [
            { label: "Engine Type", value: "2.9L Twin-Turbocharged V8" },
            { label: "Displacement", value: "2,936 cc" },
            { label: "Layout", value: "Mid-engine, Rear-Wheel Drive" },
            { label: "Dimensions", value: "4,358 x 1,970 x 1,124 mm" },
            { label: "Weight", value: "1,100 kg" }
        ],
        features: [
            "Brembo performance brakes",
            "Carbon-Kevlar lightweight body",
            "Racing cockpit & Kevlar bucket seats",
            "Lexan lightweight windows"
        ],
        pricing: {
            original: "$400,000",
            current: "$2-3 million"
        },
        vehicleType: "Supercar / Sports Car",
        production: {
            period: "1987-1992",
            units: "1,311"
        },
        image: "images/ferrari-f40.jpg"
    },
    {
        id: 2,
        brand: "Ferrari",
        name: "Ferrari 288 GTO",
        years: "1984-1987",
        tagline: "Homologation Supercar - Group B Legend",
        sold: true,
        type: "supercar",
        category: "collector",
        price: 2500000,
        performance: [
            { label: "0-100 km/h", value: "4.9 s" },
            { label: "Top Speed", value: "304 km/h" },
            { label: "Power", value: "400 hp @ 7,000 rpm" },
            { label: "Torque", value: "496 Nm @ 3,800 rpm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "12-13 L/100 km" },
            { label: "Transmission", value: "5-speed manual (RWD)" }
        ],
        technical: [
            { label: "Engine", value: "2.855L Twin-Turbo V8" },
            { label: "Layout", value: "Mid-engine RWD" },
            { label: "Dimensions", value: "4,290 x 1,910 x 1,120 mm" },
            { label: "Weight", value: "1,160 kg" }
        ],
        features: [
            "Tubular steel frame, Kevlar panels",
            "Race-derived suspension",
            "Classic analog gauges"
        ],
        pricing: {
            original: "$59,000",
            current: "$2.5 million"
        },
        vehicleType: "Homologation Supercar",
        production: {
            period: "1984-1987",
            units: "272"
        },
        image: "images/ferrari-288-gto.jpg"
    },
    {
        id: 3,
        brand: "Ferrari",
        name: "Ferrari F50",
        years: "1995-1997",
        tagline: "Formula 1 DNA for the Road",
        type: "supercar",
        category: "collector",
        price: 4000000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "3.7 s" },
            { label: "Top Speed", value: "325 km/h" },
            { label: "Power", value: "513 hp @ 8,000 rpm" },
            { label: "Torque", value: "471 Nm @ 6,500 rpm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "17 L/100 km" },
            { label: "Transmission", value: "6-speed manual" }
        ],
        technical: [
            { label: "Engine", value: "4.7L Naturally Aspirated V12" },
            { label: "Layout", value: "Mid-engine RWD" },
            { label: "Dimensions", value: "4,480 x 1,985 x 1,120 mm" },
            { label: "Weight", value: "1,230 kg" }
        ],
        features: [
            "Carbon-fiber chassis",
            "Targa removable roof",
            "F1 pushrod suspension"
        ],
        pricing: {
            original: "$475,000",
            current: "$3-5 million"
        },
        vehicleType: "Supercar / Roadster",
        production: {
            period: "1995-1997",
            units: "349"
        },
        image: "images/ferrari-f50.jpg"
    },
    {
        id: 4,
        brand: "Ferrari",
        name: "Ferrari Enzo",
        years: "2002-2004",
        tagline: "Named After the Founder - Ultimate V12 Era",
        type: "hypercar",
        category: "collector",
        price: 3500000,
        performance: [
            { label: "0-100 km/h", value: "3.1 s" },
            { label: "Top Speed", value: "350 km/h" },
            { label: "Power", value: "660 hp @ 7,800 rpm" },
            { label: "Torque", value: "657 Nm @ 5,500 rpm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "17 L/100 km" },
            { label: "Transmission", value: "6-speed F1-style" }
        ],
        technical: [
            { label: "Engine", value: "6.0L V12" },
            { label: "Layout", value: "Mid-engine RWD" },
            { label: "Dimensions", value: "4,702 x 2,035 x 1,147 mm" },
            { label: "Weight", value: "1,365 kg" }
        ],
        features: [
            "Carbon-fiber monocoque",
            "F1 paddle shifters",
            "Aerodynamic body"
        ],
        pricing: {
            original: "$652,000",
            current: "$3-4 million"
        },
        vehicleType: "Hypercar",
        production: {
            period: "2002-2004",
            units: "400"
        },
        image: "images/ferrari-enzo.jpg"
    },
    {
        id: 5,
        brand: "Ferrari",
        name: "Ferrari LaFerrari",
        years: "2013-2016",
        tagline: "Ferrari's First Hybrid Hypercar",
        type: "hypercar",
        category: "hybrid",
        price: 4000000,
        performance: [
            { label: "0-100 km/h", value: "2.6 s" },
            { label: "Top Speed", value: "350+ km/h" },
            { label: "Power", value: "963 hp (combined)" },
            { label: "Torque", value: "900+ Nm" }
        ],
        efficiency: [
            { label: "Transmission", value: "7-speed DCT" },
            { label: "Hybrid System", value: "HY-KERS" }
        ],
        technical: [
            { label: "Engine", value: "6.3L V12 + Electric Motor" },
            { label: "Layout", value: "Mid-engine hybrid" },
            { label: "Dimensions", value: "4,702 x 1,992 x 1,116 mm" },
            { label: "Weight", value: "1,255 kg" }
        ],
        features: [
            "Carbon-fiber chassis",
            "Active aerodynamics",
            "Regenerative braking"
        ],
        pricing: {
            original: "$1.4 million",
            current: "$3-5 million"
        },
        vehicleType: "Hypercar",
        production: {
            period: "2013-2016",
            units: "499"
        },
        image: "images/ferrari-laferrari.jpg"
    },
    {
        id: 6,
        brand: "Ferrari",
        name: "Ferrari 812 Superfast",
        years: "2017-Present",
        tagline: "Most Powerful Naturally Aspirated V12",
        type: "grand-tourer",
        category: "performance",
        price: 400000,
        performance: [
            { label: "0-100 km/h", value: "2.9 s" },
            { label: "Top Speed", value: "340 km/h" },
            { label: "Power", value: "800 hp @ 8,500 rpm" },
            { label: "Torque", value: "718 Nm @ 7,000 rpm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "14 L/100 km" },
            { label: "Transmission", value: "7-speed DCT" }
        ],
        technical: [
            { label: "Engine", value: "6.5L V12" },
            { label: "Layout", value: "Front-engine RWD" },
            { label: "Dimensions", value: "4,657 x 1,971 x 1,276 mm" },
            { label: "Weight", value: "1,525 kg" }
        ],
        features: [
            "Rear-wheel steering",
            "Electric power steering",
            "Luxurious interior"
        ],
        pricing: {
            original: "$335,000",
            current: "$400,000+"
        },
        vehicleType: "Grand Tourer / Supercar",
        production: {
            period: "2017-Present",
            units: "Limited production"
        },
        image: "images/ferrari-812-superfast.jpg"
    },
    {
        id: 7,
        brand: "Ferrari",
        name: "Ferrari 599 GTO",
        years: "2010-2011",
        tagline: "Track Technology Meets Road Luxury",
        type: "grand-tourer",
        category: "performance",
        price: 700000,
        performance: [
            { label: "0-100 km/h", value: "3.4 s" },
            { label: "Top Speed", value: "335 km/h" },
            { label: "Power", value: "661 hp @ 8,250 rpm" },
            { label: "Torque", value: "620 Nm @ 6,500 rpm" }
        ],
        efficiency: [
            { label: "Transmission", value: "6-speed F1 automated" }
        ],
        technical: [
            { label: "Engine", value: "6.0L V12" },
            { label: "Layout", value: "Front-engine RWD" },
            { label: "Dimensions", value: "4,665 x 1,962 x 1,336 mm" },
            { label: "Weight", value: "1,605 kg" }
        ],
        features: [
            "Derived from 599XX racer",
            "Carbon-ceramic brakes",
            "Aerodynamic tuning"
        ],
        pricing: {
            original: "$430,000",
            current: "$700,000+"
        },
        vehicleType: "GT / Supercar",
        production: {
            period: "2010-2011",
            units: "599"
        },
        image: "images/ferrari-599-gto.jpg"
    },
    {
        id: 8,
        brand: "Ferrari",
        name: "Ferrari Testarossa",
        years: "1984-1996",
        tagline: "1980s Supercar Icon",
        type: "supercar",
        category: "classic",
        price: 200000,
        performance: [
            { label: "0-100 km/h", value: "5.3 s" },
            { label: "Top Speed", value: "290 km/h" },
            { label: "Power", value: "385 hp @ 6,300 rpm" },
            { label: "Torque", value: "490 Nm @ 4,500 rpm" }
        ],
        efficiency: [
            { label: "Transmission", value: "5-speed manual" }
        ],
        technical: [
            { label: "Engine", value: "4.9L Flat-12" },
            { label: "Layout", value: "Mid-engine RWD" },
            { label: "Dimensions", value: "4,485 x 1,976 x 1,130 mm" },
            { label: "Weight", value: "1,506 kg" }
        ],
        features: [
            "Iconic side strakes",
            "Wide-body design",
            "Leather cabin"
        ],
        pricing: {
            original: "$180,000",
            current: "$250,000"
        },
        vehicleType: "Supercar / GT",
        production: {
            period: "1984-1996",
            units: "Mass production"
        },
        image: "images/ferrari-testarossa.jpg"
    },
    {
        id: 9,
        brand: "Ferrari",
        name: "Ferrari 250 GT California Spyder",
        years: "1957-1963",
        tagline: "Classic Convertible Beauty",
        type: "convertible",
        category: "classic",
        price: 22000000,
        performance: [
            { label: "0-100 km/h", value: "6.5 s" },
            { label: "Top Speed", value: "240 km/h" },
            { label: "Power", value: "280 hp @ 7,000 rpm" }
        ],
        efficiency: [
            { label: "Transmission", value: "4-speed manual" }
        ],
        technical: [
            { label: "Engine", value: "3.0L V12" },
            { label: "Layout", value: "Front-engine RWD" },
            { label: "Dimensions", value: "4,400 x 1,680 x 1,250 mm" },
            { label: "Weight", value: "1,080 kg" }
        ],
        features: [
            "Hand-built aluminum body",
            "Convertible design",
            "Chrome details"
        ],
        pricing: {
            original: "$14,000",
            current: "$20-25 million (auction)"
        },
        vehicleType: "Convertible Sports Car",
        production: {
            period: "1957-1963",
            units: "106"
        },
        image: "images/ferrari-250-gt-california.jpg"
    },
    {
        id: 10,
        brand: "Ferrari",
        name: "Ferrari 365 GT4 BB",
        years: "1973-1980",
        tagline: "Birth of the Flat-12 Ferrari Era",
        type: "supercar",
        category: "classic",
        price: 500000,
        performance: [
            { label: "0-100 km/h", value: "5.4 s" },
            { label: "Top Speed", value: "280 km/h" },
            { label: "Power", value: "360 hp @ 7,700 rpm" },
            { label: "Torque", value: "390 Nm @ 4,000 rpm" }
        ],
        efficiency: [
            { label: "Transmission", value: "5-speed manual" }
        ],
        technical: [
            { label: "Engine", value: "4.4L Flat-12 (Boxer)" },
            { label: "Layout", value: "Mid-engine RWD" },
            { label: "Dimensions", value: "4,360 x 1,800 x 1,100 mm" },
            { label: "Weight", value: "1,160 kg" }
        ],
        features: [
            "Flat-12 configuration",
            "Wedge body design",
            "Rear clamshell engine cover"
        ],
        pricing: {
            original: "$14,000",
            current: "$500,000"
        },
        vehicleType: "Supercar / GT",
        production: {
            period: "1973-1980",
            units: "Production run"
        },
        image: "images/ferrari-365-gt4-bb.jpg"
    },
    
    // ===================================
    // BUGATTI COLLECTION (11-20)
    // ===================================
    
    {
        id: 11,
        brand: "Bugatti",
        name: "Bugatti Chiron",
        years: "2016-Present",
        tagline: "The Ultimate Hypercar - Quad-Turbo W16 Beast",
        type: "hypercar",
        category: "performance",
        price: 3000000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "2.4 s" },
            { label: "Top Speed", value: "420 km/h" },
            { label: "Power", value: "1,479 hp" },
            { label: "Torque", value: "1,600 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "~22 L/100 km (combined)" },
            { label: "Transmission", value: "7-speed dual-clutch automatic" }
        ],
        technical: [
            { label: "Engine", value: "8.0L Quad-Turbo W16" },
            { label: "Drivetrain", value: "AWD" },
            { label: "Weight", value: "1,995 kg" }
        ],
        features: [
            "Active aerodynamics",
            "Carbon fiber monocoque chassis",
            "Luxury interior with advanced infotainment"
        ],
        pricing: {
            original: "$3 million",
            current: "$3.5 million"
        },
        vehicleType: "Hypercar | Coupe",
        production: {
            period: "2016-Present",
            units: "Limited production"
        },
        colors: [
            {
                name: "Classic Two-Tone",
                colorCode: "#1e40af",
                image: "images/bugatti-chiron.jpg"
            }
        ],
        image: "images/bugatti-chiron.jpg"
    },
    {
        id: 12,
        brand: "Bugatti",
        name: "Bugatti Chiron Super Sport 300+",
        years: "2019-2021",
        tagline: "Speed Record Holder - 490 km/h Beast",
        type: "hypercar",
        category: "collector",
        price: 3900000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "2.3 s" },
            { label: "Top Speed", value: "490.484 km/h (recorded)" },
            { label: "Power", value: "1,577 hp" },
            { label: "Torque", value: "1,600 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "~23 L/100 km" },
            { label: "Transmission", value: "7-speed dual-clutch" }
        ],
        technical: [
            { label: "Engine", value: "8.0L Quad-Turbo W16" },
            { label: "Drivetrain", value: "AWD" },
            { label: "Weight", value: "1,997 kg" }
        ],
        features: [
            "Extended long-tail body for aerodynamics",
            "Lightweight magnesium wheels",
            "Limited to 30 units"
        ],
        pricing: {
            original: "$3.5 million",
            current: "$3.9 million"
        },
        vehicleType: "Hypercar | Special Edition",
        production: {
            period: "2019-2021",
            units: "30"
        },
        image: "images/bugatti-chiron-super-sport-300.jpg"
    },
    {
        id: 13,
        brand: "Bugatti",
        name: "Bugatti Divo",
        years: "2018-2021",
        tagline: "Track-Oriented Masterpiece - Enhanced Aerodynamics",
        type: "hypercar",
        category: "collector",
        price: 5800000,
        sold: true,
        performance: [
            { label: "0-100 km/h", value: "2.4 s" },
            { label: "Top Speed", value: "380 km/h" },
            { label: "Power", value: "1,479 hp" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "~23 L/100 km" },
            { label: "Transmission", value: "7-speed dual-clutch" }
        ],
        technical: [
            { label: "Engine", value: "8.0L Quad-Turbo W16" },
            { label: "Weight", value: "1,960 kg" },
            { label: "Drivetrain", value: "AWD" }
        ],
        features: [
            "Track-oriented aerodynamics",
            "90 kg more downforce than Chiron",
            "Handcrafted luxury interior"
        ],
        pricing: {
            original: "$5.5 million",
            current: "$5.8 million"
        },
        vehicleType: "Hypercar | Limited Edition",
        production: {
            period: "2018-2021",
            units: "40"
        },
        image: "images/bugatti-divo.jpg"
    },
    {
        id: 14,
        brand: "Bugatti",
        name: "Bugatti Centodieci",
        years: "2020-Present",
        tagline: "EB110 Tribute - Ultra-Exclusive Hypercar",
        type: "hypercar",
        category: "collector",
        price: 9000000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "2.4 s" },
            { label: "Top Speed", value: "380 km/h" },
            { label: "Power", value: "1,600 hp" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "~22 L/100 km" },
            { label: "Transmission", value: "7-speed dual-clutch" }
        ],
        technical: [
            { label: "Engine", value: "8.0L W16" },
            { label: "Weight", value: "1,976 kg" },
            { label: "Layout", value: "AWD" }
        ],
        features: [
            "Tribute to Bugatti EB110",
            "Extremely limited (10 units)",
            "Refined aerodynamic design"
        ],
        pricing: {
            original: "$8 million",
            current: "$9 million"
        },
        vehicleType: "Hypercar | Collector's Edition",
        production: {
            period: "2020-Present",
            units: "10"
        },
        image: "images/bugatti-centodieci.jpg"
    },
    {
        id: 15,
        brand: "Bugatti",
        name: "Bugatti La Voiture Noire",
        years: "2019",
        tagline: "One-of-a-Kind Masterpiece - Most Expensive New Car",
        type: "hypercar",
        category: "collector",
        price: 18700000,
        sold: true,
        performance: [
            { label: "0-100 km/h", value: "2.5 s" },
            { label: "Top Speed", value: "420 km/h" },
            { label: "Power", value: "1,479 hp" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "~22 L/100 km" },
            { label: "Transmission", value: "7-speed dual-clutch" }
        ],
        technical: [
            { label: "Engine", value: "8.0L Quad-Turbo W16" },
            { label: "Layout", value: "AWD" },
            { label: "Weight", value: "~1,990 kg" }
        ],
        features: [
            "One-of-a-kind creation",
            "Custom carbon fiber body",
            "Inspired by Type 57 SC Atlantic"
        ],
        pricing: {
            original: "$15.5 million",
            current: "$18.7 million"
        },
        vehicleType: "Hypercar | One-Off",
        production: {
            period: "2019",
            units: "1"
        },
        image: "images/bugatti-la-voiture-noire.jpg"
    },
    {
        id: 16,
        brand: "Bugatti",
        name: "Bugatti W16 Mistral",
        years: "2022-Present",
        tagline: "Final W16 Roadster - Open-Top Excellence",
        type: "hypercar",
        category: "performance",
        price: 5000000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "2.4 s" },
            { label: "Top Speed", value: "420 km/h" },
            { label: "Power", value: "1,577 hp" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "~23 L/100 km" },
            { label: "Transmission", value: "7-speed dual-clutch" }
        ],
        technical: [
            { label: "Engine", value: "8.0L Quad-Turbo W16" },
            { label: "Type", value: "Roadster (Convertible)" },
            { label: "Weight", value: "~1,990 kg" }
        ],
        features: [
            "Final model with W16 engine",
            "Open-top design",
            "Limited to 99 units"
        ],
        pricing: {
            original: "$4 million",
            current: "$5 million"
        },
        vehicleType: "Hypercar | Roadster",
        production: {
            period: "2022-Present",
            units: "99"
        },
        image: "images/bugatti-w16-mistral.jpg"
    },
    {
        id: 17,
        brand: "Bugatti",
        name: "Bugatti Veyron Super Sport",
        years: "2010-2015",
        tagline: "World Speed Record Holder - Iconic Legend",
        type: "hypercar",
        category: "collector",
        price: 2500000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "2.5 s" },
            { label: "Top Speed", value: "431 km/h" },
            { label: "Power", value: "1,200 hp" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "~23 L/100 km" },
            { label: "Transmission", value: "7-speed dual-clutch" }
        ],
        technical: [
            { label: "Engine", value: "8.0L Quad-Turbo W16" },
            { label: "Layout", value: "AWD" },
            { label: "Weight", value: "1,888 kg" }
        ],
        features: [
            "World's fastest car (2010 record)",
            "Carbon fiber body",
            "Iconic design"
        ],
        pricing: {
            original: "$2 million",
            current: "$2.5 million"
        },
        vehicleType: "Hypercar | Coupe",
        production: {
            period: "2010-2015",
            units: "Limited production"
        },
        image: "images/bugatti-veyron-super-sport.jpg"
    },
    {
        id: 18,
        brand: "Bugatti",
        name: "Bugatti Chiron Pur Sport",
        years: "2020-Present",
        tagline: "Agility-Focused Hypercar - Track Perfection",
        type: "hypercar",
        category: "performance",
        price: 3600000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "2.3 s" },
            { label: "Top Speed", value: "350 km/h" },
            { label: "Power", value: "1,479 hp" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "~21 L/100 km" },
            { label: "Transmission", value: "7-speed dual-clutch" }
        ],
        technical: [
            { label: "Engine", value: "8.0L W16" },
            { label: "Weight", value: "1,945 kg" },
            { label: "Drivetrain", value: "AWD" }
        ],
        features: [
            "Focused on agility and cornering",
            "50 kg lighter than base Chiron",
            "Enhanced suspension and gearbox"
        ],
        pricing: {
            original: "$2 million",
            current: "$3.6 million"
        },
        vehicleType: "Hypercar | Track-Focused Edition",
        production: {
            period: "2020-Present",
            units: "Limited production"
        },
        image: "images/bugatti-chiron-pur-sport.jpg"
    },
    {
        id: 19,
        brand: "Bugatti",
        name: "Bugatti Chiron Sport",
        years: "2018-Present",
        tagline: "Lighter, Sharper Chiron - Enhanced Handling",
        type: "hypercar",
        category: "performance",
        price: 3300000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "2.5 s" },
            { label: "Top Speed", value: "420 km/h" },
            { label: "Power", value: "1,479 hp" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "~22 L/100 km" },
            { label: "Transmission", value: "7-speed dual-clutch" }
        ],
        technical: [
            { label: "Engine", value: "8.0L W16" },
            { label: "Drivetrain", value: "AWD" },
            { label: "Weight", value: "1,978 kg" }
        ],
        features: [
            "Lighter, sharper Chiron variant",
            "Sport-tuned suspension",
            "Improved lateral handling"
        ],
        pricing: {
            original: "$2.5 million",
            current: "$3.3 million"
        },
        vehicleType: "Hypercar | Sport Edition",
        production: {
            period: "2018-Present",
            units: "Limited production"
        },
        image: "images/bugatti-chiron-sport.jpg"
    },
    {
        id: 20,
        brand: "Bugatti",
        name: "Bugatti Bolide",
        years: "2021-Present",
        tagline: "Extreme Track Weapon - 1,850 HP Monster",
        type: "hypercar",
        category: "performance",
        price: 4700000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "2.2 s" },
            { label: "Top Speed", value: "~500 km/h (theoretical)" },
            { label: "Power", value: "1,850 hp" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "N/A (track use only)" },
            { label: "Transmission", value: "7-speed dual-clutch" }
        ],
        technical: [
            { label: "Engine", value: "8.0L W16 Quad-Turbo" },
            { label: "Weight", value: "1,240 kg" },
            { label: "Drivetrain", value: "AWD" }
        ],
        features: [
            "Extreme track-focused hypercar",
            "Carbon-titanium construction",
            "Limited to 40 units"
        ],
        pricing: {
            original: "$2.7 million",
            current: "$4.7 million"
        },
        vehicleType: "Hypercar | Track-Only",
        production: {
            period: "2021-Present",
            units: "40"
        },
        image: "images/bugatti-bolide.jpg"
    },
    
    // ===================================
    // LAMBORGHINI COLLECTION (21-30)
    // ===================================
    
    {
        id: 21,
        brand: "Lamborghini",
        name: "Lamborghini Revuelto",
        years: "2023-Present",
        tagline: "First Hybrid Supercar - V12 PHEV Revolution",
        type: "hypercar",
        category: "performance",
        price: 700000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "~2.5 s" },
            { label: "Top Speed", value: "~350+ km/h" },
            { label: "Power", value: "1,001 hp (combined)" }
        ],
        efficiency: [
            { label: "Powertrain", value: "Hybrid V12 + electric motors" },
            { label: "Transmission", value: "8-speed dual-clutch" }
        ],
        technical: [
            { label: "Engine", value: "6.5L V12 PHEV" },
            { label: "Layout", value: "Mid-engine, AWD" },
            { label: "Weight", value: "~1,772 kg" }
        ],
        features: [
            "Lamborghini's first production hybrid supercar",
            "Advanced aerodynamics",
            "Luxurious interior with cutting-edge technology"
        ],
        pricing: {
            original: "$700,000+",
            current: "$900,000"
        },
        vehicleType: "Hypercar | Coupe",
        production: {
            period: "2023-Present",
            units: "Limited production"
        },
        image: "images/lamborghini-revuelto.jpg"
    },
    {
        id: 22,
        brand: "Lamborghini",
        name: "Lamborghini Countach LPI 800-4",
        years: "2022-Present",
        tagline: "Countach Tribute - Hybrid V12 Icon Reborn",
        type: "hypercar",
        category: "collector",
        price: 2500000,
        sold: true,
        performance: [
            { label: "0-100 km/h", value: "~2.8 s" },
            { label: "Top Speed", value: "~355 km/h" },
            { label: "Power", value: "803 hp" }
        ],
        efficiency: [
            { label: "Powertrain", value: "Hybrid V12 + mild-hybrid assist" },
            { label: "Transmission", value: "7-speed ISR" }
        ],
        technical: [
            { label: "Engine", value: "6.5L V12 + 48V motor" },
            { label: "Layout", value: "Mid-engine AWD" },
            { label: "Weight", value: "~1,595 kg" }
        ],
        features: [
            "Tribute to the original Countach",
            "Limited production (112 units)",
            "Extreme wedge design heritage"
        ],
        pricing: {
            original: "$2.5 million+",
            current: "$3.3 million+"
        },
        vehicleType: "Limited-edition Hypercar",
        production: {
            period: "2022-Present",
            units: "112"
        },
        image: "images/lamborghini-countach-lpi-800-4.jpg"
    },
    {
        id: 23,
        brand: "Lamborghini",
        name: "Lamborghini Aventador LP 780-4 Ultimae",
        years: "2021-2022",
        tagline: "Final Aventador - V12 Era Finale",
        type: "supercar",
        category: "collector",
        price: 570000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "~2.8 s" },
            { label: "Top Speed", value: "~355 km/h" },
            { label: "Power", value: "769 hp" },
            { label: "Torque", value: "720 Nm" }
        ],
        efficiency: [
            { label: "Engine Type", value: "Naturally aspirated V12" },
            { label: "Transmission", value: "7-speed automated manual" }
        ],
        technical: [
            { label: "Engine", value: "6.5L V12" },
            { label: "Layout", value: "Mid-engine AWD" },
            { label: "Weight", value: "1,550 kg" }
        ],
        features: [
            "Final iteration of Aventador V12 era",
            "Premium carbon-fibre chassis",
            "Bespoke finishes and exclusive design"
        ],
        pricing: {
            original: "$570,000+",
            current: "$570,000"
        },
        vehicleType: "Supercar / Hypercar",
        production: {
            period: "2021-2022",
            units: "Limited production"
        },
        image: "images/lamborghini-aventador-ultimae.jpg"
    },
    {
        id: 24,
        brand: "Lamborghini",
        name: "Lamborghini Huracan STO",
        years: "2021-Present",
        tagline: "Super Trofeo Omologata - Track Beast for the Road",
        type: "supercar",
        category: "performance",
        price: 330000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "~2.9 s" },
            { label: "Top Speed", value: "~310 km/h" },
            { label: "Power", value: "640 hp" },
            { label: "Torque", value: "565 Nm" }
        ],
        efficiency: [
            { label: "Engine Type", value: "5.2L V10" },
            { label: "Transmission", value: "7-speed dual-clutch" }
        ],
        technical: [
            { label: "Engine", value: "5.2L V10" },
            { label: "Layout", value: "Mid-engine RWD" },
            { label: "Weight", value: "1,339 kg" }
        ],
        features: [
            "Track-prepared variant of the Huracan",
            "Extreme aerodynamics & lightweight components",
            "Racing-inspired cockpit"
        ],
        pricing: {
            original: "$330,000+",
            current: "$530,000"
        },
        vehicleType: "Supercar / Track-Focused",
        production: {
            period: "2021-Present",
            units: "Limited production"
        },
        image: "images/lamborghini-huracan-sto.jpg"
    },
    {
        id: 25,
        brand: "Lamborghini",
        name: "Lamborghini Urus Performante",
        years: "2022-Present",
        tagline: "Ultimate Performance SUV - Raging Bull on All Terrains",
        type: "suv",
        category: "performance",
        price: 250000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "~3.3 s" },
            { label: "Top Speed", value: "~306 km/h" },
            { label: "Power", value: "657 hp" },
            { label: "Torque", value: "850 Nm" }
        ],
        efficiency: [
            { label: "Engine Type", value: "4.0L twin-turbo V8" },
            { label: "Transmission", value: "8-speed automatic" }
        ],
        technical: [
            { label: "Engine", value: "4.0L twin-turbo V8" },
            { label: "Layout", value: "SUV AWD" },
            { label: "Weight", value: "2,150 kg" }
        ],
        features: [
            "High-performance SUV from Lamborghini",
            "Aggressive design with carbon fiber elements",
            "Practical for daily use with luxury interior"
        ],
        pricing: {
            original: "$250,000",
            current: "$650,000"
        },
        vehicleType: "Performance SUV",
        production: {
            period: "2022-Present",
            units: "Production model"
        },
        image: "images/lamborghini-urus-performante.jpg"
    },
    {
        id: 26,
        brand: "Lamborghini",
        name: "Lamborghini Sian FKP 37",
        years: "2019",
        tagline: "First Hybrid - Supercapacitor Technology Pioneer",
        type: "hypercar",
        category: "collector",
        price: 3600000,
        sold: true,
        performance: [
            { label: "0-100 km/h", value: "~2.8 s" },
            { label: "Top Speed", value: "~350 km/h" },
            { label: "Power", value: "819 hp (combined)" }
        ],
        efficiency: [
            { label: "Powertrain", value: "Hybrid (V12 + supercapacitor)" },
            { label: "Transmission", value: "7-speed ISR" }
        ],
        technical: [
            { label: "Engine", value: "6.5L V12 + electric motor" },
            { label: "Layout", value: "Mid-engine AWD" },
            { label: "Weight", value: "1,595 kg" }
        ],
        features: [
            "First hybrid Lamborghini production model",
            "Extremely limited (63 units)",
            "Futuristic styling with active aerodynamics"
        ],
        pricing: {
            original: "$2.6 million+",
            current: "$3.6 million"
        },
        vehicleType: "Hypercar | Limited Edition",
        production: {
            period: "2019",
            units: "63"
        },
        image: "images/lamborghini-sian-fkp37.jpg"
    },
    {
        id: 27,
        brand: "Lamborghini",
        name: "Lamborghini Veneno",
        years: "2013",
        tagline: "50th Anniversary Special - Extreme Aero Design",
        type: "hypercar",
        category: "collector",
        price: 4500000,
        sold: true,
        performance: [
            { label: "0-100 km/h", value: "~2.8 s" },
            { label: "Top Speed", value: "~355 km/h" },
            { label: "Power", value: "750 hp" },
            { label: "Torque", value: "690 Nm" }
        ],
        efficiency: [
            { label: "Engine Type", value: "6.5L V12" },
            { label: "Transmission", value: "7-speed ISR" }
        ],
        technical: [
            { label: "Engine", value: "6.5L V12" },
            { label: "Layout", value: "Mid-engine AWD" },
            { label: "Weight", value: "1,450 kg" }
        ],
        features: [
            "Built to celebrate 50th anniversary",
            "Extreme aerodynamic design",
            "Rare collector car (only 12 units total)"
        ],
        pricing: {
            original: "$3.5 million",
            current: "$4.5 million"
        },
        vehicleType: "Hypercar | Collector's Edition",
        production: {
            period: "2013",
            units: "12 (3 coupes + 9 roadsters)"
        },
        image: "images/lamborghini-veneno.jpg"
    },
    {
        id: 28,
        brand: "Lamborghini",
        name: "Lamborghini Centenario LP 770-4",
        years: "2016",
        tagline: "Founder's Centenary - 100 Years of Ferruccio",
        type: "hypercar",
        category: "collector",
        price: 1900000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "~2.8 s" },
            { label: "Top Speed", value: "~350 km/h" },
            { label: "Power", value: "770 hp" },
            { label: "Torque", value: "690 Nm" }
        ],
        efficiency: [
            { label: "Engine Type", value: "6.5L V12" },
            { label: "Transmission", value: "7-speed ISR" }
        ],
        technical: [
            { label: "Engine", value: "6.5L V12" },
            { label: "Layout", value: "Mid-engine AWD" },
            { label: "Weight", value: "1,520 kg" }
        ],
        features: [
            "Built to commemorate founder's 100th birthday",
            "Only 40 made worldwide (20 coupe + 20 roadster)",
            "Carbon fiber monocoque construction"
        ],
        pricing: {
            original: "$1.9 million",
            current: "$2.9 million"
        },
        vehicleType: "Hypercar | Limited Edition",
        production: {
            period: "2016",
            units: "40"
        },
        image: "images/lamborghini-centenario.jpg"
    },
    {
        id: 29,
        brand: "Lamborghini",
        name: "Lamborghini Huracan EVO RWD",
        years: "2020-Present",
        tagline: "Pure Driving Experience - Rear-Wheel Drive Thrill",
        type: "supercar",
        category: "performance",
        price: 200000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "~3.3 s" },
            { label: "Top Speed", value: "~325 km/h" },
            { label: "Power", value: "610 hp" },
            { label: "Torque", value: "560 Nm" }
        ],
        efficiency: [
            { label: "Engine Type", value: "5.2L V10" },
            { label: "Transmission", value: "7-speed dual-clutch" }
        ],
        technical: [
            { label: "Engine", value: "5.2L V10" },
            { label: "Layout", value: "Mid-engine RWD" },
            { label: "Weight", value: "1,389 kg (reduced)" }
        ],
        features: [
            "More accessible Lamborghini model",
            "Dynamic handling with rear-wheel drive",
            "Everyday usability with modern tech"
        ],
        pricing: {
            original: "$200,000",
            current: "$400,000"
        },
        vehicleType: "Supercar",
        production: {
            period: "2020-Present",
            units: "Production model"
        },
        image: "images/lamborghini-huracan-evo-rwd.jpg"
    },
    {
        id: 30,
        brand: "Lamborghini",
        name: "Lamborghini Urus S",
        years: "2023-Present",
        tagline: "Performance SUV DNA - Everyday Exotic",
        type: "suv",
        category: "performance",
        price: 230000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "~3.4 s" },
            { label: "Top Speed", value: "~305 km/h" },
            { label: "Power", value: "666 hp" },
            { label: "Torque", value: "850 Nm" }
        ],
        efficiency: [
            { label: "Engine Type", value: "4.0L twin-turbo V8" },
            { label: "Transmission", value: "8-speed automatic" }
        ],
        technical: [
            { label: "Engine", value: "4.0L twin-turbo V8" },
            { label: "Layout", value: "SUV AWD" },
            { label: "Weight", value: "2,200 kg" }
        ],
        features: [
            "Performance SUV with Lamborghini DNA",
            "Modern technology and connectivity",
            "Practical yet extreme luxury SUV"
        ],
        pricing: {
            original: "$130,000",
            current: "$150,000"
        },
        vehicleType: "Performance SUV",
        production: {
            period: "2023-Present",
            units: "Production model"
        },
        image: "images/lamborghini-urus-s.jpg"
    },
    
    // ===================================
    // PORSCHE COLLECTION (31-40)
    // ===================================
    
    {
        id: 31,
        brand: "Porsche",
        name: "Porsche 911 Turbo S (992)",
        years: "2020-Present",
        tagline: "Ultimate 911 - Twin-Turbo Flat-6 Perfection",
        type: "supercar",
        category: "performance",
        price: 230000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "2.6 s" },
            { label: "Top Speed", value: "330 km/h" },
            { label: "Power", value: "640 hp @ 6,750 rpm" },
            { label: "Torque", value: "800 Nm @ 2,500-4,000 rpm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "11.0 L/100 km" },
            { label: "Transmission", value: "8-speed PDK dual-clutch" }
        ],
        technical: [
            { label: "Engine", value: "3.8L Twin-Turbo Flat-6" },
            { label: "Drivetrain", value: "AWD" },
            { label: "Weight", value: "~1,640 kg" }
        ],
        features: [
            "AWD system with active torque distribution",
            "Adaptive aerodynamics with active rear wing",
            "Premium interior with Sport Chrono Package"
        ],
        pricing: {
            original: "$230,000",
            current: "$330,000"
        },
        vehicleType: "Supercar / Grand Tourer",
        production: {
            period: "2020-Present",
            units: "Production model"
        },
        image: "images/porsche-911-turbo-s-992.jpg"
    },
    {
        id: 32,
        brand: "Porsche",
        name: "Porsche 911 GT3 RS (992)",
        years: "2023-Present",
        tagline: "Track Weapon - Naturally Aspirated Perfection",
        type: "supercar",
        category: "performance",
        price: 250000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "3.2 s" },
            { label: "Top Speed", value: "296 km/h" },
            { label: "Power", value: "518 hp" },
            { label: "Torque", value: "470 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "12.7 L/100 km" },
            { label: "Transmission", value: "7-speed PDK" }
        ],
        technical: [
            { label: "Engine", value: "4.0L Naturally Aspirated Flat-6" },
            { label: "Drivetrain", value: "RWD" },
            { label: "Weight", value: "1,450 kg" }
        ],
        features: [
            "Track-focused design with DRS system",
            "Active aerodynamics with massive rear wing",
            "Lightweight carbon fiber body panels"
        ],
        pricing: {
            original: "$150,000",
            current: "$200,000"
        },
        vehicleType: "Track Supercar",
        production: {
            period: "2023-Present",
            units: "Limited production"
        },
        image: "images/porsche-911-gt3-rs-992.jpg"
    },
    {
        id: 33,
        brand: "Porsche",
        name: "Porsche Taycan Turbo S",
        years: "2020-Present",
        tagline: "Electric Revolution - Pure Performance EV",
        type: "sedan",
        category: "performance",
        price: 185000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "2.8 s" },
            { label: "Top Speed", value: "260 km/h" },
            { label: "Power", value: "750 hp (overboost)" },
            { label: "Torque", value: "1,050 Nm" }
        ],
        efficiency: [
            { label: "Electric Range", value: "~400 km" },
            { label: "Transmission", value: "2-speed automatic (EV)" }
        ],
        technical: [
            { label: "Powertrain", value: "Dual-Motor Electric AWD" },
            { label: "Battery", value: "93.4 kWh" },
            { label: "Weight", value: "2,295 kg" }
        ],
        features: [
            "800V fast-charging system (270 kW)",
            "Futuristic interior with curved displays",
            "Fully electric with instant torque"
        ],
        pricing: {
            original: "$185,000",
            current: "$285,000"
        },
        vehicleType: "Electric Performance Sedan",
        production: {
            period: "2020-Present",
            units: "Production model"
        },
        image: "images/porsche-taycan-turbo-s.jpg"
    },
    {
        id: 34,
        brand: "Porsche",
        name: "Porsche 918 Spyder",
        years: "2013-2015",
        tagline: "Hybrid Hypercar Legend - The Holy Trinity",
        type: "hypercar",
        category: "collector",
        price: 1000000,
        sold: true,
        performance: [
            { label: "0-100 km/h", value: "2.5 s" },
            { label: "Top Speed", value: "345 km/h" },
            { label: "Power", value: "887 hp (combined)" },
            { label: "Torque", value: "1,280 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "3.1 L/100 km (combined)" },
            { label: "Transmission", value: "7-speed PDK" }
        ],
        technical: [
            { label: "Engine", value: "4.6L V8 Hybrid" },
            { label: "Powertrain", value: "V8 + 2 electric motors" },
            { label: "Weight", value: "1,640 kg" }
        ],
        features: [
            "Plug-in hybrid hypercar with 918 units made",
            "Carbon-fiber monocoque chassis",
            "N�rburgring lap record holder (2013)"
        ],
        pricing: {
            original: "$850,000",
            current: "$1-1.5 million"
        },
        vehicleType: "Hypercar",
        production: {
            period: "2013-2015",
            units: "918"
        },
        image: "images/porsche-918-spyder.jpg"
    },
    {
        id: 35,
        brand: "Porsche",
        name: "Porsche Cayman GT4 RS",
        years: "2022-Present",
        tagline: "Mid-Engine Marvel - Track-Bred Precision",
        type: "supercar",
        category: "performance",
        price: 150000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "3.4 s" },
            { label: "Top Speed", value: "315 km/h" },
            { label: "Power", value: "493 hp" },
            { label: "Torque", value: "450 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "12.0 L/100 km" },
            { label: "Transmission", value: "7-speed PDK" }
        ],
        technical: [
            { label: "Engine", value: "4.0L Flat-6" },
            { label: "Layout", value: "Mid-engine RWD" },
            { label: "Weight", value: "1,415 kg" }
        ],
        features: [
            "Mid-engine balance for optimal handling",
            "Lightweight body with carbon components",
            "Precise steering and track-focused setup"
        ],
        pricing: {
            original: "$150,000",
            current: "$150,000-$200,000"
        },
        vehicleType: "Track Supercar",
        production: {
            period: "2022-Present",
            units: "Limited production"
        },
        image: "images/porsche-cayman-gt4-rs.jpg"
    },
    {
        id: 36,
        brand: "Porsche",
        name: "Porsche Panamera Turbo S E-Hybrid",
        years: "2021-Present",
        tagline: "Luxury Hybrid Sedan - Power Meets Efficiency",
        type: "sedan",
        category: "luxury",
        price: 200000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "3.2 s" },
            { label: "Top Speed", value: "315 km/h" },
            { label: "Power", value: "690 hp (combined)" },
            { label: "Torque", value: "870 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "3.0 L/100 km (Hybrid mode)" },
            { label: "Transmission", value: "8-speed PDK" }
        ],
        technical: [
            { label: "Engine", value: "4.0L V8 Twin-Turbo Hybrid" },
            { label: "Powertrain", value: "V8 + electric motor" },
            { label: "Weight", value: "2,310 kg" }
        ],
        features: [
            "Luxury sedan with hybrid technology",
            "Adaptive air suspension with multiple modes",
            "Executive rear seating with massage function"
        ],
        pricing: {
            original: "$200,000",
            current: "$200,000-$300,000"
        },
        vehicleType: "Luxury Hybrid Sedan",
        production: {
            period: "2021-Present",
            units: "Production model"
        },
        image: "images/porsche-panamera-turbo-s-ehybrid.jpg"
    },
    {
        id: 37,
        brand: "Porsche",
        name: "Porsche 911 Targa 4 GTS",
        years: "2022-Present",
        tagline: "Open-Air Driving - Classic Targa Design",
        type: "convertible",
        category: "performance",
        price: 165000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "3.5 s" },
            { label: "Top Speed", value: "307 km/h" },
            { label: "Power", value: "473 hp" },
            { label: "Torque", value: "570 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "11.3 L/100 km" },
            { label: "Transmission", value: "8-speed PDK" }
        ],
        technical: [
            { label: "Engine", value: "3.0L Twin-Turbo Flat-6" },
            { label: "Drivetrain", value: "AWD" },
            { label: "Weight", value: "1,675 kg" }
        ],
        features: [
            "Retractable Targa roof for open-air driving",
            "AWD system for all-weather capability",
            "Classic 911 design with modern performance"
        ],
        pricing: {
            original: "$165,000",
            current: "$265,000"
        },
        vehicleType: "Convertible Sports Car",
        production: {
            period: "2022-Present",
            units: "Production model"
        },
        image: "images/porsche-911-targa-4-gts.jpg"
    },
    {
        id: 38,
        brand: "Porsche",
        name: "Porsche 911 Carrera GTS (992)",
        years: "2021-Present",
        tagline: "Sweet Spot - Balance of Comfort and Sport",
        type: "supercar",
        category: "performance",
        price: 150000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "3.4 s" },
            { label: "Top Speed", value: "311 km/h" },
            { label: "Power", value: "473 hp" },
            { label: "Torque", value: "570 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "10.8 L/100 km" },
            { label: "Transmission", value: "8-speed PDK" }
        ],
        technical: [
            { label: "Engine", value: "3.0L Twin-Turbo Flat-6" },
            { label: "Drivetrain", value: "RWD / AWD" },
            { label: "Weight", value: "1,515 kg" }
        ],
        features: [
            "Balance of comfort and sport performance",
            "Wide-body design with enhanced styling",
            "Sport Chrono Package as standard"
        ],
        pricing: {
            original: "$100,000",
            current: "$150,000"
        },
        vehicleType: "Grand Tourer / Sports Car",
        production: {
            period: "2021-Present",
            units: "Production model"
        },
        image: "images/porsche-911-carrera-gts-992.jpg"
    },
    {
        id: 39,
        brand: "Porsche",
        name: "Porsche Macan GTS",
        years: "2023-Present",
        tagline: "Compact Performance SUV - Sports Car DNA",
        type: "suv",
        category: "performance",
        price: 88000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "4.3 s" },
            { label: "Top Speed", value: "272 km/h" },
            { label: "Power", value: "434 hp" },
            { label: "Torque", value: "550 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "10.5 L/100 km" },
            { label: "Transmission", value: "7-speed PDK" }
        ],
        technical: [
            { label: "Engine", value: "2.9L Twin-Turbo V6" },
            { label: "Drivetrain", value: "AWD" },
            { label: "Weight", value: "2,000 kg" }
        ],
        features: [
            "Compact luxury SUV with sports DNA",
            "Sports-tuned suspension with PASM",
            "AWD system for all-terrain capability"
        ],
        pricing: {
            original: "$68,000",
            current: "$88,000"
        },
        vehicleType: "Performance SUV",
        production: {
            period: "2023-Present",
            units: "Production model"
        },
        image: "images/porsche-macan-gts.jpg"
    },
    {
        id: 40,
        brand: "Porsche",
        name: "Porsche Cayenne Turbo GT",
        years: "2023-Present",
        tagline: "Fastest Porsche SUV - 650 HP Beast",
        type: "suv",
        category: "performance",
        price: 190000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "3.3 s" },
            { label: "Top Speed", value: "300 km/h" },
            { label: "Power", value: "650 hp" },
            { label: "Torque", value: "850 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "12.0 L/100 km" },
            { label: "Transmission", value: "8-speed Tiptronic S" }
        ],
        technical: [
            { label: "Engine", value: "4.0L Twin-Turbo V8" },
            { label: "Drivetrain", value: "AWD" },
            { label: "Weight", value: "2,260 kg" }
        ],
        features: [
            "Fastest SUV from Porsche",
            "Aggressive design with carbon fiber elements",
            "Adaptive air suspension with Sport Plus mode"
        ],
        pricing: {
            original: "$90,000",
            current: "$190,000"
        },
        vehicleType: "Performance SUV",
        production: {
            period: "2023-Present",
            units: "Production model"
        },
        image: "images/porsche-cayenne-turbo-gt.jpg"
    },
    
    // ===================================
    // ROLLS-ROYCE COLLECTION (41-50)
    // ===================================
    
    {
        id: 41,
        brand: "Rolls-Royce",
        name: "Rolls-Royce Phantom Series II",
        years: "2023-Present",
        tagline: "Flagship Luxury - The Ultimate Expression",
        type: "sedan",
        category: "luxury",
        price: 460000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "5.3 s" },
            { label: "Top Speed", value: "250 km/h (electronically limited)" },
            { label: "Power", value: "563 hp" },
            { label: "Torque", value: "900 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "14.8 L/100 km" },
            { label: "Transmission", value: "8-speed automatic" }
        ],
        technical: [
            { label: "Engine", value: "6.75L Twin-Turbo V12" },
            { label: "Drivetrain", value: "RWD" },
            { label: "Weight", value: "2,560 kg" }
        ],
        features: [
            "Flagship model with unparalleled luxury",
            "Advanced sound insulation (Magic Carpet Ride)",
            "Starlight Headliner with 1,340 fiber optic lights"
        ],
        pricing: {
            original: "$460,000+",
            current: "$499,999"
        },
        vehicleType: "Ultra-Luxury Sedan",
        production: {
            period: "2023-Present",
            units: "Bespoke production"
        },
        image: "images/rolls-royce-phantom-series-ii.jpg"
    },
    {
        id: 42,
        brand: "Rolls-Royce",
        name: "Rolls-Royce Ghost",
        years: "2021-Present",
        tagline: "Minimalist Elegance - Post-Opulent Design",
        type: "sedan",
        category: "luxury",
        price: 345000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "4.8 s" },
            { label: "Top Speed", value: "250 km/h" },
            { label: "Power", value: "563 hp" },
            { label: "Torque", value: "850 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "14.0 L/100 km" },
            { label: "Transmission", value: "8-speed automatic" }
        ],
        technical: [
            { label: "Engine", value: "6.75L Twin-Turbo V12" },
            { label: "Drivetrain", value: "AWD" },
            { label: "Weight", value: "2,490 kg" }
        ],
        features: [
            "Elegant minimalist design philosophy",
            "AWD system for all-weather capability",
            "Advanced air suspension with Planar system"
        ],
        pricing: {
            original: "$345,000",
            current: "$444,000"
        },
        vehicleType: "Luxury Sedan",
        production: {
            period: "2021-Present",
            units: "Production model"
        },
        image: "images/rolls-royce-ghost.jpg"
    },
    {
        id: 43,
        brand: "Rolls-Royce",
        name: "Rolls-Royce Cullinan",
        years: "2023-Present",
        tagline: "King of SUVs - Effortless Everywhere",
        type: "suv",
        category: "luxury",
        price: 380000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "5.0 s" },
            { label: "Top Speed", value: "250 km/h" },
            { label: "Power", value: "563 hp" },
            { label: "Torque", value: "850 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "15.0 L/100 km" },
            { label: "Transmission", value: "8-speed automatic" }
        ],
        technical: [
            { label: "Engine", value: "6.75L Twin-Turbo V12" },
            { label: "Drivetrain", value: "AWD" },
            { label: "Weight", value: "2,660 kg" }
        ],
        features: [
            "First Rolls-Royce SUV with off-road capability",
            "Luxury lounge seating with champagne cooler",
            "Rear cabin theater seating configuration"
        ],
        pricing: {
            original: "$380,000",
            current: "$588,000"
        },
        vehicleType: "Ultra-Luxury SUV",
        production: {
            period: "2023-Present",
            units: "Production model"
        },
        image: "images/rolls-royce-cullinan.jpg"
    },
    {
        id: 44,
        brand: "Rolls-Royce",
        name: "Rolls-Royce Spectre",
        years: "2024-Present",
        tagline: "Electric Revolution - Silent Luxury Redefined",
        type: "coupe",
        category: "luxury",
        price: 420000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "4.4 s" },
            { label: "Top Speed", value: "250 km/h" },
            { label: "Power", value: "577 hp" },
            { label: "Torque", value: "900 Nm" }
        ],
        efficiency: [
            { label: "Electric Range", value: "~520 km (WLTP)" },
            { label: "Transmission", value: "Single-speed automatic (EV)" }
        ],
        technical: [
            { label: "Powertrain", value: "Dual-Motor Electric AWD" },
            { label: "Battery", value: "102 kWh" },
            { label: "Weight", value: "2,975 kg" }
        ],
        features: [
            "First all-electric Rolls-Royce production car",
            "Futuristic coupe design with starlight doors",
            "Spirit of Ecstasy with illuminated grille"
        ],
        pricing: {
            original: "$420,000",
            current: "$555,000"
        },
        vehicleType: "Electric Luxury Coupe",
        production: {
            period: "2024-Present",
            units: "Production model"
        },
        image: "images/rolls-royce-spectre.jpg"
    },
    {
        id: 45,
        brand: "Rolls-Royce",
        name: "Rolls-Royce Dawn",
        years: "2016-2023",
        tagline: "Convertible Elegance - Social Driving Experience",
        type: "convertible",
        category: "luxury",
        price: 356000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "4.9 s" },
            { label: "Top Speed", value: "250 km/h" },
            { label: "Power", value: "563 hp" },
            { label: "Torque", value: "820 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "14.2 L/100 km" },
            { label: "Transmission", value: "8-speed automatic" }
        ],
        technical: [
            { label: "Engine", value: "6.6L Twin-Turbo V12" },
            { label: "Drivetrain", value: "RWD" },
            { label: "Weight", value: "2,560 kg" }
        ],
        features: [
            "Convertible elegance with silent roof operation",
            "Handcrafted interior with finest materials",
            "4-seat open-top grand touring"
        ],
        pricing: {
            original: "$356,000",
            current: "$666,000"
        },
        vehicleType: "Luxury Convertible",
        production: {
            period: "2016-2023",
            units: "Production ended"
        },
        image: "images/rolls-royce-dawn.jpg"
    },
    {
        id: 46,
        brand: "Rolls-Royce",
        name: "Rolls-Royce Wraith",
        years: "2013-2023",
        tagline: "Power and Presence - Gentleman's GT",
        type: "coupe",
        category: "luxury",
        price: 343000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "4.6 s" },
            { label: "Top Speed", value: "250 km/h" },
            { label: "Power", value: "624 hp" },
            { label: "Torque", value: "870 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "14.0 L/100 km" },
            { label: "Transmission", value: "8-speed automatic" }
        ],
        technical: [
            { label: "Engine", value: "6.6L Twin-Turbo V12" },
            { label: "Drivetrain", value: "RWD" },
            { label: "Weight", value: "2,360 kg" }
        ],
        features: [
            "Luxurious grand tourer with powerful V12",
            "Sporty coupe styling with fastback design",
            "Satellite Aided Transmission for predictive shifting"
        ],
        pricing: {
            original: "$343,000",
            current: "$399,000"
        },
        vehicleType: "Grand Tourer Coupe",
        production: {
            period: "2013-2023",
            units: "Production ended"
        },
        image: "images/rolls-royce-wraith.jpg"
    },
    {
        id: 47,
        brand: "Rolls-Royce",
        name: "Rolls-Royce Boat Tail",
        years: "2021",
        tagline: "Coachbuilt Masterpiece - One of Three",
        type: "convertible",
        category: "collector",
        price: 28000000,
        sold: true,
        performance: [
            { label: "0-100 km/h", value: "5.0 s" },
            { label: "Top Speed", value: "250 km/h" },
            { label: "Power", value: "563 hp" },
            { label: "Torque", value: "900 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "15.0 L/100 km" },
            { label: "Transmission", value: "8-speed automatic" }
        ],
        technical: [
            { label: "Engine", value: "6.75L V12" },
            { label: "Drivetrain", value: "RWD" },
            { label: "Weight", value: "~2,600 kg" }
        ],
        features: [
            "Bespoke body designed for individual client",
            "Only 3 built worldwide",
            "Hand-crafted luxury yacht-inspired design with hosting suite"
        ],
        pricing: {
            original: "$28 million",
            current: "$30 million"
        },
        vehicleType: "Ultra-Luxury Coachbuilt Convertible",
        production: {
            period: "2021",
            units: "3"
        },
        image: "images/rolls-royce-boat-tail.jpg"
    },
    {
        id: 48,
        brand: "Rolls-Royce",
        name: "Rolls-Royce Black Badge Ghost",
        years: "2023-Present",
        tagline: "Dark Side of Luxury - Enhanced Performance",
        type: "sedan",
        category: "luxury",
        price: 395000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "4.5 s" },
            { label: "Top Speed", value: "250 km/h" },
            { label: "Power", value: "591 hp" },
            { label: "Torque", value: "900 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "14.6 L/100 km" },
            { label: "Transmission", value: "8-speed automatic" }
        ],
        technical: [
            { label: "Engine", value: "6.75L Twin-Turbo V12" },
            { label: "Drivetrain", value: "AWD" },
            { label: "Weight", value: "2,490 kg" }
        ],
        features: [
            "Dark-themed luxury with black chrome accents",
            "Enhanced performance tuning for sportier feel",
            "Bespoke Black Badge interior craftsmanship"
        ],
        pricing: {
            original: "$395,000",
            current: "$399,000"
        },
        vehicleType: "Performance Luxury Sedan",
        production: {
            period: "2023-Present",
            units: "Production model"
        },
        image: "images/rolls-royce-black-badge-ghost.jpg"
    },
    {
        id: 49,
        brand: "Rolls-Royce",
        name: "Rolls-Royce Black Badge Cullinan",
        years: "2023-Present",
        tagline: "Dark Titan - Performance Luxury SUV",
        type: "suv",
        category: "luxury",
        price: 450000,
        sold: false,
        performance: [
            { label: "0-100 km/h", value: "4.9 s" },
            { label: "Top Speed", value: "250 km/h" },
            { label: "Power", value: "600 hp" },
            { label: "Torque", value: "900 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "15.2 L/100 km" },
            { label: "Transmission", value: "8-speed automatic" }
        ],
        technical: [
            { label: "Engine", value: "6.75L Twin-Turbo V12" },
            { label: "Drivetrain", value: "AWD" },
            { label: "Weight", value: "2,660 kg" }
        ],
        features: [
            "Dark aesthetic design with black detailing",
            "Sportier suspension tuning for dynamic driving",
            "Exclusive Black Badge wheels and exterior trim"
        ],
        pricing: {
            original: "$450,000",
            current: "$555,000"
        },
        vehicleType: "Luxury Performance SUV",
        production: {
            period: "2023-Present",
            units: "Production model"
        },
        image: "images/rolls-royce-black-badge-cullinan.jpg"
    },
    {
        id: 50,
        brand: "Rolls-Royce",
        name: "Rolls-Royce Arcadia Droptail",
        years: "2024",
        tagline: "Bespoke Perfection - $30 Million Roadster",
        type: "convertible",
        category: "", // X�a badge collector theo y�u c?u
        price: 30000000,
        sold: true,
        performance: [
            { label: "0-100 km/h", value: "4.8 s" },
            { label: "Top Speed", value: "250 km/h" },
            { label: "Power", value: "593 hp" },
            { label: "Torque", value: "840 Nm" }
        ],
        efficiency: [
            { label: "Fuel Consumption", value: "15.0 L/100 km" },
            { label: "Transmission", value: "8-speed automatic" }
        ],
        technical: [
            { label: "Engine", value: "6.75L Twin-Turbo V12" },
            { label: "Drivetrain", value: "RWD" },
            { label: "Weight", value: "~2,650 kg" }
        ],
        features: [
            "Bespoke roadster with one-of-a-kind craftsmanship",
            "Yacht-inspired interior with exotic wood panels",
            "Hand-built by Rolls-Royce Coachbuild division"
        ],
        pricing: {
            original: "$30 million",
            current: "$33.3 million"
        },
        vehicleType: "Coachbuilt Convertible",
        production: {
            period: "2024",
            units: "1"
        },
        image: "images/rolls-royce-arcadia-droptail.jpg"
    }
];
