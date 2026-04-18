import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, X, Check, NotebookPen, Clock } from "lucide-react";
import { getTelegramUser } from "@/lib/telegram";

interface Note {
  id: number;
  telegram_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export default function NotesPage() {
  const user = getTelegramUser();
  const telegramId = user?.id;

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Note | null>(null);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [saving, setSaving] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const newTitleRef = useRef<HTMLInputElement>(null);

  const fetchNotes = async () => {
    if (!telegramId) return;
    try {
      const res = await fetch(`/api/users/${telegramId}/notes`);
      const data = await res.json();
      setNotes(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotes(); }, [telegramId]);

  useEffect(() => {
    if (creating && newTitleRef.current) newTitleRef.current.focus();
    if (editing && titleRef.current) titleRef.current.focus();
  }, [creating, editing]);

  const handleCreate = async () => {
    if (!telegramId || (!newTitle.trim() && !newContent.trim())) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/users/${telegramId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle.trim(), content: newContent.trim() }),
      });
      const note = await res.json();
      setNotes([note, ...notes]);
      setCreating(false);
      setNewTitle("");
      setNewContent("");
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!telegramId || !editing) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/users/${telegramId}/notes/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editing.title, content: editing.content }),
      });
      const updated = await res.json();
      setNotes(notes.map((n) => (n.id === updated.id ? updated : n)));
      setEditing(null);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (noteId: number) => {
    if (!telegramId) return;
    try {
      await fetch(`/api/users/${telegramId}/notes/${noteId}`, { method: "DELETE" });
      setNotes(notes.filter((n) => n.id !== noteId));
      if (editing?.id === noteId) setEditing(null);
    } catch (e) {
      console.error(e);
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("km-KH", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 space-y-4 pb-24"
    >
      <div className="flex items-center justify-between pt-4">
        <div>
          <h1 className="text-2xl font-bold font-serif mb-1">កំណត់ចំណាំ</h1>
          <p className="text-sm text-muted-foreground">
            {notes.length > 0 ? `${notes.length} កំណត់ចំណាំ` : "មិនទាន់មានកំណត់ចំណាំ"}
          </p>
        </div>
        <Button
          size="icon"
          className="rounded-full w-10 h-10 shadow-md"
          onClick={() => { setCreating(true); setEditing(null); }}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <AnimatePresence>
        {creating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
          >
            <Card className="border-primary/40 shadow-md overflow-hidden">
              <CardContent className="p-4 space-y-3">
                <input
                  ref={newTitleRef}
                  type="text"
                  placeholder="ចំណងជើង..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-base font-semibold bg-transparent outline-none placeholder:text-muted-foreground/50 border-b border-border pb-2"
                />
                <textarea
                  placeholder="សរសេរចំណាំរបស់អ្នក..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  className="w-full text-sm bg-transparent outline-none resize-none placeholder:text-muted-foreground/50"
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => { setCreating(false); setNewTitle(""); setNewContent(""); }}
                  >
                    <X className="w-4 h-4 mr-1" /> បោះបង់
                  </Button>
                  <Button
                    size="sm"
                    disabled={saving || (!newTitle.trim() && !newContent.trim())}
                    onClick={handleCreate}
                  >
                    <Check className="w-4 h-4 mr-1" /> រក្សាទុក
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-muted/40 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && notes.length === 0 && !creating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-muted-foreground"
        >
          <NotebookPen className="w-14 h-14 mb-4 opacity-20" />
          <p className="text-base font-medium">មិនទាន់មានកំណត់ចំណាំ</p>
          <p className="text-sm mt-1">ចុចប៊ូតុង + ដើម្បីបន្ថែម</p>
        </motion.div>
      )}

      <AnimatePresence>
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            layout
          >
            {editing?.id === note.id ? (
              <Card className="border-primary/40 shadow-md overflow-hidden">
                <CardContent className="p-4 space-y-3">
                  <input
                    ref={titleRef}
                    type="text"
                    value={editing.title}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    placeholder="ចំណងជើង..."
                    className="w-full text-base font-semibold bg-transparent outline-none placeholder:text-muted-foreground/50 border-b border-border pb-2"
                  />
                  <textarea
                    value={editing.content}
                    onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                    placeholder="ខ្លឹមសារ..."
                    rows={4}
                    className="w-full text-sm bg-transparent outline-none resize-none placeholder:text-muted-foreground/50"
                  />
                  <div className="flex gap-2 justify-between">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(note.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> លុប
                    </Button>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setEditing(null)}>
                        <X className="w-4 h-4 mr-1" /> បោះបង់
                      </Button>
                      <Button size="sm" disabled={saving} onClick={handleUpdate}>
                        <Check className="w-4 h-4 mr-1" /> រក្សាទុក
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card
                className="border-border/50 shadow-sm overflow-hidden cursor-pointer hover:border-primary/30 transition-colors active:scale-[0.99]"
                onClick={() => { setEditing(note); setCreating(false); }}
              >
                <CardContent className="p-4">
                  {note.title && (
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">{note.title}</h3>
                  )}
                  {note.content && (
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {note.content}
                    </p>
                  )}
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground/60">
                    <Clock className="w-3 h-3" />
                    {formatDate(note.updated_at)}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
