/**
 * PORTFOLIO CONFIGURATION
 */

const CONFIG = {
    manualAlbums: [
        {
            id: 'underground',
            title: 'Underground',
            description: 'Metro stations around the world',
            coverImage: 'images/albums/underground/westfriedhof | munich | bavaria | germany.jpg',
            photos: [
                { id: 'ug1', title: 'westfriedhof | munich | bavaria | germany', url_medium: 'images/albums/underground/westfriedhof | munich | bavaria | germany.jpg', url_large: 'images/albums/underground/westfriedhof | munich | bavaria | germany.jpg' },
                { id: 'ug2', title: 'candidplatz | u-bahn | munich | germany', url_medium: 'images/albums/underground/candidplatz | u-bahn | munich | germany.jpg', url_large: 'images/albums/underground/candidplatz | u-bahn | munich | germany.jpg' },
                { id: 'ug3', title: 'u-bahn | georg-brauchle-ring | munich | germany', url_medium: 'images/albums/underground/u-bahn | georg-brauchle-ring | munich | germany.jpg', url_large: 'images/albums/underground/u-bahn | georg-brauchle-ring | munich | germany.jpg' },
                { id: 'ug4', title: 'u-bahn | sendlinger tor | munich | germany', url_medium: 'images/albums/underground/u-bahn | sendlinger tor | munich | germany.jpg', url_large: 'images/albums/underground/u-bahn | sendlinger tor | munich | germany.jpg' },
                { id: 'ug5', title: 'kreilerstrasse | u-bahn | munich | germany', url_medium: 'images/albums/underground/kreilerstrasse | u-bahn | munich | germany.jpg', url_large: 'images/albums/underground/kreilerstrasse | u-bahn | munich | germany.jpg' },
                { id: 'ug6', title: 'moosach | munich | germany', url_medium: 'images/albums/underground/moosach | munich | germany.jpg', url_large: 'images/albums/underground/moosach | munich | germany.jpg' },
                { id: 'ug7', title: 'olympia einkaufszentrum | munich | germany', url_medium: 'images/albums/underground/olympia einkaufszentrum | munich | germany.jpg', url_large: 'images/albums/underground/olympia einkaufszentrum | munich | germany.jpg' },
                { id: 'ug8', title: 'orchard | singapore', url_medium: 'images/albums/underground/orchard | singapore.jpg', url_large: 'images/albums/underground/orchard | singapore.jpg' },
                { id: 'ug9', title: 'bencoolen | singapore', url_medium: 'images/albums/underground/bencoolen | singapore.jpg', url_large: 'images/albums/underground/bencoolen | singapore.jpg' },
                { id: 'ug10', title: 'expo mrt | singapore', url_medium: 'images/albums/underground/expo mrt | singapore.jpg', url_large: 'images/albums/underground/expo mrt | singapore.jpg' },
                { id: 'ug11', title: 'bras .basah mrt | singapore', url_medium: 'images/albums/underground/bras .basah mrt | singapore.jpg', url_large: 'images/albums/underground/bras .basah mrt | singapore.jpg' },
                { id: 'ug12', title: 'aljunied mrt station', url_medium: 'images/albums/underground/aljunied mrt station.jpg', url_large: 'images/albums/underground/aljunied mrt station.jpg' },
                { id: 'ug13', title: 'smrt deport | bishan  singapore', url_medium: 'images/albums/underground/smrt deport | bishan  singapore.jpg', url_large: 'images/albums/underground/smrt deport | bishan  singapore.jpg' },
                { id: 'ug14', title: 'conlay station | kuala lumpur | malaysia', url_medium: 'images/albums/underground/conlay station | kuala lumpur | malaysia.jpg', url_large: 'images/albums/underground/conlay station | kuala lumpur | malaysia.jpg' }
            ]
        },
        {
            id: 'skyline',
            title: 'Skyline',
            description: 'City skylines from around the world',
            coverImage: 'images/albums/skyline/marina bay | central business district | singapore.jpg',
            photos: [
                // Singapore - Marina Bay / CBD area
                { id: 'sk1', title: 'marina bay | central business district | singapore', url_medium: 'images/albums/skyline/marina bay | central business district | singapore.jpg', url_large: 'images/albums/skyline/marina bay | central business district | singapore.jpg' },
                { id: 'sk2', title: 'skyline | marina bay | singapore', url_medium: 'images/albums/skyline/skyline | marina bay | singapore.jpg', url_large: 'images/albums/skyline/skyline | marina bay | singapore.jpg' },
                { id: 'sk3', title: 'helix bridge - marina bay sands | marina bay | singapore', url_medium: 'images/albums/skyline/helix bridge - marina bay sands | marina bay | singapore.jpg', url_large: 'images/albums/skyline/helix bridge - marina bay sands | marina bay | singapore.jpg' },
                { id: 'sk4', title: 'singapore flyer | marina bay | singapore', url_medium: 'images/albums/skyline/singapore flyer | marina bay | singapore.jpg', url_large: 'images/albums/skyline/singapore flyer | marina bay | singapore.jpg' },
                { id: 'sk5', title: 'benjamin sheares bridge | central business district | singapore', url_medium: 'images/albums/skyline/benjamin sheares bridge | central business district | singapore.jpg', url_large: 'images/albums/skyline/benjamin sheares bridge | central business district | singapore.jpg' },
                { id: 'sk6', title: 'uob plaza one | central business district | singapore', url_medium: 'images/albums/skyline/uob plaza one | central business district | singapore.jpg', url_large: 'images/albums/skyline/uob plaza one | central business district | singapore.jpg' },
                { id: 'sk7', title: 'victoria concert hall | downtown | singapore', url_medium: 'images/albums/skyline/victoria concert hall | downtown | singapore.jpg', url_large: 'images/albums/skyline/victoria concert hall | downtown | singapore.jpg' },
                { id: 'sk8', title: 'buddah tooth relic temple | south bridge road | singapore', url_medium: 'images/albums/skyline/buddah tooth relic temple | south bridge road | singapore.jpg', url_large: 'images/albums/skyline/buddah tooth relic temple | south bridge road | singapore.jpg' },
                { id: 'sk9', title: 'merlion faber point | singapore', url_medium: 'images/albums/skyline/merlion faber point | singapore.jpg', url_large: 'images/albums/skyline/merlion faber point | singapore.jpg' },
                // Singapore - Bishan area
                { id: 'sk10', title: 'bishan cresta | bishan | singapore', url_medium: 'images/albums/skyline/bishan cresta | bishan | singapore.jpg', url_large: 'images/albums/skyline/bishan cresta | bishan | singapore.jpg' },
                { id: 'sk11', title: 'kallang river | bishan | singapore', url_medium: 'images/albums/skyline/kallang river | bishan | singapore.jpg', url_large: 'images/albums/skyline/kallang river | bishan | singapore.jpg' },
                // Singapore - Other areas
                { id: 'sk12', title: 'skyline | aljunied | singapore', url_medium: 'images/albums/skyline/skyline | aljunied | singapore.jpg', url_large: 'images/albums/skyline/skyline | aljunied | singapore.jpg' },
                { id: 'sk13', title: 'raffles marina lighthouse | tuas | singapore', url_medium: 'images/albums/skyline/raffles marina lighthouse | tuas | singapore.jpg', url_large: 'images/albums/skyline/raffles marina lighthouse | tuas | singapore.jpg' },
                // Malaysia - Kuala Lumpur
                { id: 'sk14', title: 'petronas towers | kuala. lumpur | malaysia', url_medium: 'images/albums/skyline/petronas towers | kuala. lumpur | malaysia.jpg', url_large: 'images/albums/skyline/petronas towers | kuala. lumpur | malaysia.jpg' },
                { id: 'sk15', title: 'petronas towers | kuala. lumpur | malaysia ii', url_medium: 'images/albums/skyline/petronas towers | kuala. lumpur | malaysia ii.jpg', url_large: 'images/albums/skyline/petronas towers | kuala. lumpur | malaysia ii.jpg' },
                { id: 'sk16', title: 'clock tower | sultan abdul samad building | kuala lumpur | malaysia', url_medium: 'images/albums/skyline/clock tower | sultan abdul samad building | kuala lumpur | malaysia-Enhanced-NR-2.jpg', url_large: 'images/albums/skyline/clock tower | sultan abdul samad building | kuala lumpur | malaysia-Enhanced-NR-2.jpg' },
                // Malaysia - Johor
                { id: 'sk17', title: 'forrest city | johor | malaysia', url_medium: 'images/albums/skyline/forrest city | johor | malaysia.jpg', url_large: 'images/albums/skyline/forrest city | johor | malaysia.jpg' },
                // Spain
                { id: 'sk18', title: 'parc del guinardó | barcelona | spain', url_medium: 'images/albums/skyline/parc del guinardó | barcelona | spain.jpg', url_large: 'images/albums/skyline/parc del guinardó | barcelona | spain.jpg' },
                { id: 'sk19', title: 'sunrise | el masnou | catalonia | spain', url_medium: 'images/albums/skyline/sunrise | el masnou | catalonia | spain.jpg', url_large: 'images/albums/skyline/sunrise | el masnou | catalonia | spain.jpg' },
                // Chile
                { id: 'sk20', title: 'catedral metropolitana de santiago de chile | santiago | chile', url_medium: 'images/albums/skyline/catedral metropolitana de santiago de chile | santiago | chile.jpg', url_large: 'images/albums/skyline/catedral metropolitana de santiago de chile | santiago | chile.jpg' },
                { id: 'sk21', title: 'santiago | chile', url_medium: 'images/albums/skyline/santiago | chile.jpg', url_large: 'images/albums/skyline/santiago | chile.jpg' },
                // Germany
                { id: 'sk22', title: 'dom zu unserer lieben frau | munich | germany', url_medium: 'images/albums/skyline/dom zu unserer lieben frau | munich | germany.jpg', url_large: 'images/albums/skyline/dom zu unserer lieben frau | munich | germany.jpg' },
                { id: 'sk23', title: 'wartenberg | bavaria | germany', url_medium: 'images/albums/skyline/wartenberg | bavaria | germany.jpg', url_large: 'images/albums/skyline/wartenberg | bavaria | germany.jpg' }
            ]
        },
        {
            id: 'mountains',
            title: 'Mountains',
            description: 'Alpine landscapes',
            coverImage: 'images/albums/mountains/paradies | stubai | tirol | austria.jpg',
            photos: [
                { id: 'mt1', title: 'paradies | stubai | tirol | austria', url_medium: 'images/albums/mountains/paradies | stubai | tirol | austria.jpg', url_large: 'images/albums/mountains/paradies | stubai | tirol | austria.jpg' },
                { id: 'mt2', title: 'paradies | stubaier höhenweg | tirol | austria', url_medium: 'images/albums/mountains/paradies | stubaier höhenweg | tirol | austria.jpg', url_large: 'images/albums/mountains/paradies | stubaier höhenweg | tirol | austria.jpg' },
                { id: 'mt3', title: 'nürnberger hütte | tirol | austria', url_medium: 'images/albums/mountains/nürnberger hütte | tirol | austria.jpg', url_large: 'images/albums/mountains/nürnberger hütte | tirol | austria.jpg' },
                { id: 'mt4', title: 'nürnberger hütte ii | tirol | austria', url_medium: 'images/albums/mountains/nürnberger hütte ii | tirol | austria.jpg', url_large: 'images/albums/mountains/nürnberger hütte ii | tirol | austria.jpg' },
                { id: 'mt5', title: 'bremer hütte | tirol | austria', url_medium: 'images/albums/mountains/bremer hütte | tirol | austria.jpg', url_large: 'images/albums/mountains/bremer hütte | tirol | austria.jpg' },
                { id: 'mt6', title: 'kalkwand | ilmspitze | tirol | austria', url_medium: 'images/albums/mountains/kalkwand | ilmspitze | tirol | austria.jpg', url_large: 'images/albums/mountains/kalkwand | ilmspitze | tirol | austria.jpg' },
                { id: 'mt7', title: 'sonnklarspitze | tirol | austria', url_medium: 'images/albums/mountains/sonnklarspitze | tirol | austria.jpg', url_large: 'images/albums/mountains/sonnklarspitze | tirol | austria.jpg' },
                { id: 'mt8', title: 'botzer | alto adige| italy', url_medium: 'images/albums/mountains/botzer | alto adige| italy.jpg', url_large: 'images/albums/mountains/botzer | alto adige| italy.jpg' }
            ]
        },
        {
            id: 'nepal',
            title: 'Nepal',
            description: 'Himalayan adventures',
            coverImage: 'images/albums/nepal/everst - nuptse - lhotse - makalu | solokhumbu | nepal.jpg',
            photos: [
                { id: 'np1', title: 'everst - nuptse - lhotse - makalu | solokhumbu | nepal', url_medium: 'images/albums/nepal/everst - nuptse - lhotse - makalu | solokhumbu | nepal.jpg', url_large: 'images/albums/nepal/everst - nuptse - lhotse - makalu | solokhumbu | nepal.jpg' },
                { id: 'np2', title: 'everst | lothse | nuptse | solokhumbu | nepal', url_medium: 'images/albums/nepal/everst | lothse | nuptse | solokhumbu | nepal.jpg', url_large: 'images/albums/nepal/everst | lothse | nuptse | solokhumbu | nepal.jpg' },
                { id: 'np3', title: 'base camp | mount everest | solokhumbu | nepal', url_medium: 'images/albums/nepal/base camp | mount everest | solokhumbu | nepal.jpg', url_large: 'images/albums/nepal/base camp | mount everest | solokhumbu | nepal.jpg' },
                { id: 'np4', title: 'ama dablam | solokhumbu | nepal', url_medium: 'images/albums/nepal/ama dablam | solokhumbu | nepal.jpg', url_large: 'images/albums/nepal/ama dablam | solokhumbu | nepal.jpg' },
                { id: 'np5', title: 'ama dablam ii | solokhumbu | nepal', url_medium: 'images/albums/nepal/ama dablam ii | solokhumbu | nepal.jpg', url_large: 'images/albums/nepal/ama dablam ii | solokhumbu | nepal.jpg' },
                { id: 'np6', title: 'khumbu glacier | ama dablam | solokhumbu | nepal', url_medium: 'images/albums/nepal/khumbu glacier | ama dablam | solokhumbu | nepal.jpg', url_large: 'images/albums/nepal/khumbu glacier | ama dablam | solokhumbu | nepal.jpg' },
                { id: 'np7', title: 'lothse - ama dablam | solokhumbu | nepal', url_medium: 'images/albums/nepal/lothse - ama dablam | solokhumbu | nepal.jpg', url_large: 'images/albums/nepal/lothse - ama dablam | solokhumbu | nepal.jpg' },
                { id: 'np8', title: 'taboche | solukhumbu | nepal', url_medium: 'images/albums/nepal/taboche | solukhumbu | nepal.jpg', url_large: 'images/albums/nepal/taboche | solukhumbu | nepal.jpg' },
                { id: 'np9', title: 'tengboche | solokhumbu | nepal', url_medium: 'images/albums/nepal/tengboche | solokhumbu | nepal.jpg', url_large: 'images/albums/nepal/tengboche | solokhumbu | nepal.jpg' },
                { id: 'np10', title: 'namche bazar | solokhumbu | nepal', url_medium: 'images/albums/nepal/namche bazar | solokhumbu | nepal.jpg', url_large: 'images/albums/nepal/namche bazar | solokhumbu | nepal.jpg' },
                { id: 'np11', title: 'thakiri choling gomba | phortse | solokhumbu | nepal', url_medium: 'images/albums/nepal/thakiri choling gomba | phortse | solokhumbu | nepal.jpg', url_large: 'images/albums/nepal/thakiri choling gomba | phortse | solokhumbu | nepal.jpg' }
            ]
        },
        {
            id: 'animals',
            title: 'Animals',
            description: 'Wildlife photography',
            coverImage: 'images/albums/animals/orangutan | singapore zoo | mandai | singapore.jpg.jpg',
            photos: [
                { id: 'an1', title: 'orangutan | singapore zoo | mandai | singapore', url_medium: 'images/albums/animals/orangutan | singapore zoo | mandai | singapore.jpg.jpg', url_large: 'images/albums/animals/orangutan | singapore zoo | mandai | singapore.jpg.jpg' },
                { id: 'an2', title: 'meerkat | singapore zoo | mandai | singapore', url_medium: 'images/albums/animals/meerkat | singapore zoo | mandai | singapore.jpg.jpg', url_large: 'images/albums/animals/meerkat | singapore zoo | mandai | singapore.jpg.jpg' },
                { id: 'an3', title: 'gharial | singapore zoo | mandai | singapore', url_medium: 'images/albums/animals/gharial | singapore zoo | mandai | singapore.jpg', url_large: 'images/albums/animals/gharial | singapore zoo | mandai | singapore.jpg' },
                { id: 'an4', title: 'macaque | thomson nature park | singapore', url_medium: 'images/albums/animals/macaque | thomson nature park | singapore.jpg', url_large: 'images/albums/animals/macaque | thomson nature park | singapore.jpg' },
                { id: 'an5', title: 'tropidolaemus wagleri | thomson nature park | singapore', url_medium: 'images/albums/animals/tropidolaemus wagleri | thomson nature park | singapore.jpg', url_large: 'images/albums/animals/tropidolaemus wagleri | thomson nature park | singapore.jpg' },
                { id: 'an6', title: 'papuan hornbill | bird paradise | mandai | singapore', url_medium: 'images/albums/animals/papuan hornbill | bird paradise | mandai | singapore.jpg', url_large: 'images/albums/animals/papuan hornbill | bird paradise | mandai | singapore.jpg' },
                { id: 'an7', title: 'brown anole | bird paradise | mandai | singapore', url_medium: 'images/albums/animals/brown anole | bird paradise | mandai | singapore.jpg', url_large: 'images/albums/animals/brown anole | bird paradise | mandai | singapore.jpg' },
                { id: 'an8', title: 'rhinoceros hornbill | sunghei boloh wetland reserve | singapore', url_medium: 'images/albums/animals/rhinoceros hornbill | sunghei boloh wetland reserve | singapore.jpg', url_large: 'images/albums/animals/rhinoceros hornbill | sunghei boloh wetland reserve | singapore.jpg' },
                { id: 'an9', title: 'milky storch | sungei buloh wetland reserve | singapore', url_medium: 'images/albums/animals/milky storch | sungei buloh wetland reserve | singapore.jpg', url_large: 'images/albums/animals/milky storch | sungei buloh wetland reserve | singapore.jpg' },
                { id: 'an10', title: 'squirrel | sunghei boloh wetland reserve | singapore', url_medium: 'images/albums/animals/squirrel | sunghei boloh wetland reserve | singapore.jpg', url_large: 'images/albums/animals/squirrel | sunghei boloh wetland reserve | singapore.jpg' },
                { id: 'an11', title: 'grey heron | bishan park | singapore', url_medium: 'images/albums/animals/grey heron | bishan park | singapore.jpg', url_large: 'images/albums/animals/grey heron | bishan park | singapore.jpg' },
                { id: 'an12', title: 'grey heron | bishan-ang mo kio park | singapore', url_medium: 'images/albums/animals/grey heron | bishan-ang mo kio park | singapore.jpg', url_large: 'images/albums/animals/grey heron | bishan-ang mo kio park | singapore.jpg' },
                { id: 'an13', title: 'monitor lizard | bishan park | singapore', url_medium: 'images/albums/animals/monitor lizard | bishan park | singapore.jpg', url_large: 'images/albums/animals/monitor lizard | bishan park | singapore.jpg' },
                { id: 'an14', title: 'javan myna | bishan-ang mo kio park | singapore', url_medium: 'images/albums/animals/javan myna | bishan-ang mo kio park | singapore.jpg', url_large: 'images/albums/animals/javan myna | bishan-ang mo kio park | singapore.jpg' },
                { id: 'an15', title: 'white breasted kingisher | bishan-ang mo koi park | singapore', url_medium: 'images/albums/animals/white breasted kingisher | bishan-ang mo koi park | singapore.jpg', url_large: 'images/albums/animals/white breasted kingisher | bishan-ang mo koi park | singapore.jpg' },
                { id: 'an16', title: 'white breasted waterhen | bishan | singapore', url_medium: 'images/albums/animals/white breasted waterhen | bishan | singapore.jpg', url_large: 'images/albums/animals/white breasted waterhen | bishan | singapore.jpg' },
                { id: 'an17', title: "Here's looking at you, kid | bishan-ang mo kio park | singapore", url_medium: "images/albums/animals/Here's looking at you, kid | bishan-ang mo kio park | singapore.jpg", url_large: "images/albums/animals/Here's looking at you, kid | bishan-ang mo kio park | singapore.jpg" },
                { id: 'an18', title: 'common kinfisher | bidadari park | singapore', url_medium: 'images/albums/animals/common kinfisher | bidadari park | singapore.jpg', url_large: 'images/albums/animals/common kinfisher | bidadari park | singapore.jpg' },
                { id: 'an19', title: 'calotes versicolor | bidadari park | siingapore', url_medium: 'images/albums/animals/calotes versicolor | bidadari park | siingapore.jpg', url_large: 'images/albums/animals/calotes versicolor | bidadari park | siingapore.jpg' },
                { id: 'an20', title: 'common scarlet | bukit timah nature reserve | singapore', url_medium: 'images/albums/animals/common scarlet | bukit timah nature reserve | singapore.jpg', url_large: 'images/albums/animals/common scarlet | bukit timah nature reserve | singapore.jpg' },
                { id: 'an21', title: 'butterfly | singapore zoo | mandai | singapore', url_medium: 'images/albums/animals/butterfly | singapore zoo | mandai | singapore.jpg', url_large: 'images/albums/animals/butterfly | singapore zoo | mandai | singapore.jpg' },
                { id: 'an22', title: 'saddle billed stork | jurong bird park | singapore', url_medium: 'images/albums/animals/saddle billed stork | jurong bird park | singapore.jpg', url_large: 'images/albums/animals/saddle billed stork | jurong bird park | singapore.jpg' }
            ]
        },
        {
            id: 'fireworks',
            title: 'Fireworks',
            description: 'National Day celebrations',
            coverImage: 'images/albums/fireworks/national day parade rehersal 2024 | marina bay | singapore.jpg',
            photos: [
                { id: 'fw1', title: 'national day parade rehersal 2025 | marina bay | singapore', url_medium: 'images/albums/fireworks/national day parade rehersal 2025 | marina bay | singapore.jpg', url_large: 'images/albums/fireworks/national day parade rehersal 2025 | marina bay | singapore.jpg' },
                { id: 'fw2', title: 'national day parade rehersal 2025 | marina bay | singapore | ii', url_medium: 'images/albums/fireworks/national day parade rehersal 2025 | marina bay | singapore | ii.jpg', url_large: 'images/albums/fireworks/national day parade rehersal 2025 | marina bay | singapore | ii.jpg' },
                { id: 'fw3', title: 'national day parade rehersal 2025 | marina bay | singapore | iii', url_medium: 'images/albums/fireworks/national day parade rehersal 2025 | marina bay | singapore | iii.jpg', url_large: 'images/albums/fireworks/national day parade rehersal 2025 | marina bay | singapore | iii.jpg' },
                { id: 'fw4', title: 'national day parade rehersal 2024 | marina bay | singapore', url_medium: 'images/albums/fireworks/national day parade rehersal 2024 | marina bay | singapore.jpg', url_large: 'images/albums/fireworks/national day parade rehersal 2024 | marina bay | singapore.jpg' },
                { id: 'fw5', title: 'national day parade rehersal 2024 | marina bay | singapore | ii', url_medium: 'images/albums/fireworks/national day parade rehersal 2024 | marina bay | singapore | ii.jpg', url_large: 'images/albums/fireworks/national day parade rehersal 2024 | marina bay | singapore | ii.jpg' },
                { id: 'fw6', title: 'national day parade rehersal 2024 | marina bay | singapore | iii', url_medium: 'images/albums/fireworks/national day parade rehersal 2024 | marina bay | singapore | iii.jpg', url_large: 'images/albums/fireworks/national day parade rehersal 2024 | marina bay | singapore | iii.jpg' },
                { id: 'fw7', title: 'national day parade rehersal 2024 | marina bay | singapore | iv', url_medium: 'images/albums/fireworks/national day parade rehersal 2024 | marina bay | singapore | iv.jpg', url_large: 'images/albums/fireworks/national day parade rehersal 2024 | marina bay | singapore | iv.jpg' },
                { id: 'fw8', title: 'national day parade rehersal 2024 | marina bay | singapore | v', url_medium: 'images/albums/fireworks/national day parade rehersal 2024 | marina bay | singapore | v.jpg', url_large: 'images/albums/fireworks/national day parade rehersal 2024 | marina bay | singapore | v.jpg' },
                { id: 'fw9', title: 'national day parade rehersal 2023 | marina bay | singapore', url_medium: 'images/albums/fireworks/national day parade rehersal 2023 | marina bay | singapore.jpg', url_large: 'images/albums/fireworks/national day parade rehersal 2023 | marina bay | singapore.jpg' },
                { id: 'fw10', title: 'national day parade rehersal 2022 | marina bay | singapore', url_medium: 'images/albums/fireworks/national day parade rehersal 2022 | marina bay | singapore.jpg', url_large: 'images/albums/fireworks/national day parade rehersal 2022 | marina bay | singapore.jpg' },
                { id: 'fw11', title: 'national day parade rehersal 2022 | marina bay | singapore | ii', url_medium: 'images/albums/fireworks/national day parade rehersal 2022 | marina bay | singapore | ii.jpg', url_large: 'images/albums/fireworks/national day parade rehersal 2022 | marina bay | singapore | ii.jpg' }
            ]
        }
    ]
};
