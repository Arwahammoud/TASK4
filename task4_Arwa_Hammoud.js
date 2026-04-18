const database = {
    p1: {
        id: "p1",
        author: { name: "Mira", email: "mira@trendpulse.dev", verified: true },
        content: "Meet @sara at the hub #js #async",
        engagement: { likes: 12, shares: 2, comments: 4 },
        createdAt: "2026-04-01T09:00:00.000Z"
    },
    p2: {
        id: "p2",
        author: { name: "Rami", email: "invalid-email", verified: false },
        content: "Checkout #node tutorials",
        engagement: { likes: 3 },
        createdAt: "2026-04-02T11:30:00.000Z"
    }
};

//====================
//1) Rich post model
//====================

function describePostForUi(post) {
    const post1 = { ...post, meta: { channel: "web" } };
    //or console.log(Object.assign({}, database?.p1, { meta: { channel: "web" } }));
    const { author: { name: authorName } } = post
    const keysCount = Object.keys(post1).length;
    return {
        title: post?.id,
        authorName: authorName,
        keysCount: keysCount
    }

}
//console.log(describePostForUi(database?.p1));

//====================
//2) Safe nested reads
//====================

function getEngagementTotals(post) {
    return {
        likes: post?.engagement?.likes ?? 0,
        shares: post?.engagement?.shares ?? 0,
        comments: post?.engagement?.comments ?? 0
    }
}


const x = { engagement: { likes: 5, shares: 1 } };
const y = { engagement: { likes: 2 } };

//console.log(getEngagementTotals(x))
//console.log(getEngagementTotals(y))

//=========================
//3) Simulated async fetch
//=========================
function getPostById(posts, postId) {
    // your code
    posts = Object.values(posts);
    const post = posts.find(p => p.id === postId);

    if (!post) return "404"

    return post
}

function fetchPostById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const pp = getPostById(database, id);
            if (pp != 404)
                resolve(pp);
            else
                reject("NOT FOUND");
        }, 30);
    })
}
async function demoFetch() {
    try {
        const post = await fetchPostById("p3");
        console.log("success", post);
    }
    catch (err) {
        console.log("Error : ", err);
    }
    finally {
        console.log("done");
    }
}
//===================================
//4) Regex: email, hashtags, mentions
//===================================

const emailOk = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
const hashTag = /#[\w؀-ۿ]+/g;
const mention = /@[\w]+/g;

function analyzePostText(post) {
    const email1 = post?.author?.email ?? "";
    const content1 = post?.content ?? "";
    return {
        emailValid: emailOk.test(email1) ?? [],
        tags: (content1).match(hashTag) ?? [],
        mentions: (content1).match(mention) ?? []
    }
}
// console.log(analyzePostText(database?.p2));

//=============================
//5) Event loop: predict order
//=============================

//1.sync code (1 , 4) : Excutes immediately (Highest priority)
//2.Microtasks (3) : promises run right after sync finishes
//3.Task Queue (4) : settimeout runs lasts (lowest priority)

//===================================
//6) Date format + live refresh timer
//===================================

function formatIsoDateOnly(iso) {
    const date = new Date(iso);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
}
//formatIsoDateOnly("2026-04-04T10:00:00.000Z");

function startRefreshDemo(onTick) {
    let n = 0;
    const id = setInterval(() => {
        n++;
        onTick(n);
        if (n >= 3) clearInterval(id);
    }, 200);
}
/*console.log(startRefreshDemo((x) => {
    console.log("x : ",x);
}));*/

//=====================
//7) Final orchestrator
//=====================

async function runTrendPulsePhase2() {
    const ids = ["p1", "p2"];

    let loaded = 0;
    let validEmails = 0;
    let invalidAuthorId = null;
    const datesFormatted = [];

    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        try {
            const post = await fetchPostById(id);
            loaded++;
            const formattedDate = formatIsoDateOnly(post?.createdAt);
            console.log("hi", formattedDate);
            datesFormatted.push(formattedDate);
            const { emailValid } = analyzePostText(post);
            if (emailValid) {
                validEmails++;
            } else {
                if (invalidAuthorId === null) {
                    invalidAuthorId = post.id;
                }
            }
        } catch (error) {
            console.log(`Failed to load post ${id} :`, error);
        }
    }
    return {
        loaded,
        validEmails,
        invalidAuthorId,
        datesFormatted
    };
}
runTrendPulsePhase2().then((summary) => { console.log(summary); });