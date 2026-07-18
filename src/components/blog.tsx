import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface BlogImageBlock {
  type: "image";
  src: string;
  alt?: string;
  position?: string;
}

interface BlogQuoteBlock {
  type: "quote";
  text: string;
  author?: string;
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  yearMonth: string;
  readTime: string;
  summary: string;
  content: (string | BlogImageBlock | BlogQuoteBlock)[];
  image?: string;
  imagePosition?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "back-to-the-future-trilogy",
    title: "back to the future: the trilogy",
    date: "july 19, 2026",
    yearMonth: "jul 2026",
    readTime: "6 min read",
    summary: "my personal thoughts on why robert zemeckis' time-travel films are still the benchmark of sci-fi cinema today.",
    image: "/back-to-the-future/einstein_time_travel.jpg",
    content: [
      {
        type: "quote",
        text: "your future is whatever you make it, so make it a good one."
      },
      "the trilogy released in the 1980's delivers on every front and sets the benchmark for time travel movies. zemeckis and bob gale created a narrative structure so tight that it has influenced my appreciation of screenwriting. from the moment doc brown sends his dog einstein one minute into the future in the parking lot of twin pines mall, it is a masterclass in science fiction storytelling. even today, decades later, i find it incredibly entertaining to watch.",
      "interestingly, i notice that the futuristic things i saw in the second film's depiction of 2015, like hoverboards, flying cars refueling with household garbage in a mr. fusion home energy reactor, and self-lacing sneakers, have still not materialized in my world, but i still find it highly entertaining and fun to look back at that retro-future vision. the filmmakers didn't try to make accurate predictions; instead, they made a future that was comic, colorful, and satirical, which is why it holds up so well.",
      {
        type: "image",
        src: "/back-to-the-future/mr_fusion.jpg",
        alt: "doc brown refuelling delorean with mr fusion energy reactor"
      },
      "michael j. fox got many roles and opportunities after that, cemented as one of the most charismatic leading actors of his generation. the trilogy has become a massive cult classic now, loved by fans across generations. but i still pray for mj fox as he continues his courageous battle with parkinson's, showing a level of grace and determination in real life that matches the heroic heart of marty mcfly.",
      "remarkably, christopher lloyd is still alive to this date and still active in the community, bringing doc brown's wild-eyed spirit with him to conventions and cameos. his theatrical energy and chemistry with fox was the true emotional anchor of the entire adventure for me.",
      "i also cannot think about this trilogy without remembering its legendary music. alan silvestri's orchestral score, especially the booming, brass-heavy main theme, gives the films their epic sense of scale and adventure. on top of that, huey lewis and the news delivered iconic 80s hits like 'the power of love' and 'back in time' that perfectly capture the energy of the decade, not to mention marty mcfly's timeline-bending guitar performance of chuck berry's 'johnny b. goode' at the school dance.",
      "everyone should at least give this trilogy a watch. it is a timeless classic that reminds me that my future is whatever i make it."
    ]
  },
  {
    id: "lord-of-the-rings",
    title: "lord of the rings: my absolute favourite",
    date: "may 12, 2026",
    yearMonth: "may 2026",
    readTime: "5 min read",
    summary: "why peter jackson's fantasy trilogy represents the absolute peak of cinematic adaptation and filmmaking scale.",
    image: "/lord-of-the-rings/frodo_ring_falling.jpg",
    content: [
      {
        type: "quote",
        text: "there's some good in this world, mr. frodo, and it's worth fighting for."
      },
      "peter jackson's lord of the rings trilogy is, without a doubt, my absolute favourite cinematic experience. the scale, the dedication of the cast and crew, and the faithfulness to j.r.r. tolkien's lore set a standard that i feel will never be matched in fantasy filmmaking again, a journey bound from the moment the ring slips onto frodo's finger. it is no surprise they won so many oscars, sweeping the academy awards with seventeen wins in total, including eleven wins for the return of the king alone.",
      {
        type: "image",
        src: "/lord-of-the-rings/gandalf_minas_tirith.jpg",
        alt: "gandalf riding shadowfax to minas tirith"
      },
      "more than anything, this is my comfort movie to watch whatever mood i am in. i can just pick it up from anywhere, starting from the first movie, and get completely lost in it, watching gandalf the white riding shadowfax like the wind across the plains to minas tirith.",
      {
        type: "image",
        src: "/lord-of-the-rings/sauron_hand_ring.jpg",
        alt: "sauron's hand holding the one ring"
      },
      "the casting and chemistry of every character felt absolutely perfect. from the fatherly warmth of ian mckellen's gandalf to the quiet, burdened heroism of elijah wood's frodo, every performance felt like it was plucked directly from tolkien's pages, making the setting feel alive, ancient, and grounded, tracing back to the dark lord sauron's armored fist holding the one ring.",
      {
        type: "image",
        src: "/lord-of-the-rings/gandalf_glamdring.jpg",
        alt: "gandalf holding glamdring sword"
      },
      "crucially, the film isn't really about war or politics, but rather, most importantly, it is about friendship and loyalty. the bond between frodo and sam, and the fellowship as a whole, is the true heart of the adventure, standing firm even when gandalf stands ready with his sword glamdring.",
      {
        type: "image",
        src: "/lord-of-the-rings/four_hobbits.jpg",
        alt: "the four hobbits standing by a stream",
        position: "object-top"
      },
      "i find the practical effects, miniatures, and the groundbreaking CGI for gollum to hold up better than most CGI-heavy blockbusters released today. the prosthetic work by weta workshop gives the orcs and creatures a tactile, terrifying presence, keeping the journey of the four hobbits feeling grounded in a real, breathing world.",
      {
        type: "image",
        src: "/lord-of-the-rings/argonath.jpg",
        alt: "the argonath stone pillars on river anduin"
      },
      "howard shore's score is my absolute favourite soundtrack in film history. each culture—from the whimsical woodwinds of the hobbits to the sweeping, tragic strings of rohan (and no, despite sharing the name, i do not own a horse or a crown, though the music makes me feel like i do) and the booming brass of gondor as they pass the towering stone statues of the argonath—has its own theme that tells the story musically.",
      "it is a trilogy that i return to year after year, and it never fails to move me. it is the definition of pure cinema magic. do watch the extended versions."
    ]
  }
];

export const Blog: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const clean = window.location.pathname.replace(/^\//, '').toLowerCase();
      const parts = clean.split('/');
      if (parts[0] === 'blog' && parts[1]) {
        return parts[1];
      }
    }
    return null;
  });

  // Keep state in sync with external browser path changes (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const clean = window.location.pathname.replace(/^\//, '').toLowerCase();
      const parts = clean.split('/');
      if (parts[0] === 'blog' && parts[1]) {
        setSelectedPostId(parts[1]);
      } else {
        setSelectedPostId(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSelectPost = (id: string | null) => {
    setSelectedPostId(id);
    if (typeof window !== "undefined") {
      const newPath = id ? `/blog/${id}` : "/blog";
      window.history.pushState({ view: "blog", postId: id }, "", newPath);
    }
  };

  const activePost = blogPosts.find((p) => p.id === selectedPostId);

  return (
    <div className="space-y-12">
      {/* Blog Section Header */}
      <div className="flex items-baseline justify-between border-b border-zinc-200/50 dark:border-zinc-900/50 pb-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-satoshi">
            blog.
          </h2>
          {!selectedPostId && (
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
              [{blogPosts.length.toString().padStart(2, "0")}/{blogPosts.length.toString().padStart(2, "0")}] articles
            </span>
          )}
        </div>

        {/* Top-Right Back Button (Visible in reading view) */}
        {selectedPostId && (
          <button
            onClick={() => handleSelectPost(null)}
            className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            [back]
          </button>
        )}
      </div>

      <div className="relative min-h-[250px]">
        <AnimatePresence mode="wait">
          {!selectedPostId ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {blogPosts.length > 0 ? (
                <div className="divide-y divide-zinc-100 dark:divide-zinc-900/50">
                  {blogPosts.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => handleSelectPost(post.id)}
                      className="group w-full py-6 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 text-left hover:opacity-85 transition-opacity cursor-pointer"
                    >
                      {/* Left: Monospace Date */}
                      <span className="text-xs font-mono text-zinc-400 dark:text-zinc-550 sm:w-24 shrink-0 pt-0.5">
                        {post.yearMonth}
                      </span>

                      {/* Right: Title & Summary */}
                      <div className="space-y-1.5 flex-1">
                        <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors flex items-center gap-1">
                          {post.title}
                          <span className="inline-block transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                            →
                          </span>
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-500 italic">
                  no posts yet.
                </p>
              )}
            </motion.div>
          ) : (
            activePost && (
              <motion.div
                key="detail"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Article Header */}
                <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-900/40 pb-4">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white font-satoshi">
                    {activePost.title}
                  </h3>
                  <div className="flex gap-3 text-[10px] font-mono text-zinc-400 dark:text-zinc-550">
                    <span>{activePost.date}</span>
                    <span>•</span>
                    <span>{activePost.readTime}</span>
                  </div>
                </div>

                {/* Optional Image */}
                {activePost.image && (
                  <div className="overflow-hidden border border-zinc-200/60 dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-950/40">
                    <img
                      src={activePost.image}
                      alt={activePost.title}
                      className={`w-full h-auto max-h-[320px] object-cover ${activePost.imagePosition || "object-center"} transition-all duration-500 hover:scale-[1.015] hover:brightness-[1.03] hover:contrast-[1.01]`}
                    />
                  </div>
                )}

                {/* Article Content */}
                <div className="space-y-6 text-[15px] sm:text-[16.5px] text-zinc-800 dark:text-zinc-200 leading-relaxed font-serif font-normal">
                  {activePost.content.map((item, idx) => {
                    if (typeof item === "string") {
                      return <p key={idx}>{item}</p>;
                    } else if (item && item.type === "image") {
                      return (
                        <div key={idx} className="overflow-hidden border border-zinc-200/60 dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-950/40 my-6">
                          <img
                            src={item.src}
                            alt={item.alt || ""}
                            className={`w-full h-auto max-h-[320px] object-cover ${item.position || "object-center"} transition-all duration-500 hover:scale-[1.015] hover:brightness-[1.03] hover:contrast-[1.01]`}
                          />
                        </div>
                      );
                    } else if (item && item.type === "quote") {
                      return (
                        <blockquote key={idx} className="pl-4 border-l-2 border-zinc-300 dark:border-zinc-800 italic my-6 text-zinc-600 dark:text-zinc-400 font-serif leading-relaxed">
                          "{item.text}"
                          {item.author && (
                            <span className="block text-[11px] font-mono text-zinc-400 dark:text-zinc-650 not-italic mt-1">
                              — {item.author}
                            </span>
                          )}
                        </blockquote>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Bottom Back Button */}
                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900/40">
                  <button
                    onClick={() => handleSelectPost(null)}
                    className="text-xs font-mono text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    [back to all articles]
                  </button>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
