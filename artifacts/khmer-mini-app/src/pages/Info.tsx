import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info as InfoIcon, HelpCircle, MapPin } from "lucide-react";

export default function InfoPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 space-y-6"
    >
      <div className="pt-4">
        <h1 className="text-2xl font-bold font-serif mb-1">ព័ត៌មាន</h1>
        <p className="text-sm text-muted-foreground">ស្វែងយល់បន្ថែមអំពីសេវាកម្មរបស់យើង</p>
      </div>

      <Card className="border-primary/20 shadow-sm bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-serif flex items-center gap-2 text-primary">
            <InfoIcon className="w-5 h-5" />
            សេចក្តីណែនាំ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/80 leading-relaxed">
            កម្មវិធីនេះត្រូវបានរចនាឡើងពិសេសសម្រាប់ប្រជាជនកម្ពុជា ដើម្បីផ្តល់នូវបទពិសោធន៍ដ៏ល្អប្រសើរក្នុងការប្រើប្រាស់ Telegram Mini App ជាភាសាជាតិ។
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-bold font-serif mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-accent" />
          សំណួរញឹកញាប់
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-border">
            <AccordionTrigger className="text-sm font-medium hover:text-primary">តើកម្មវិធីនេះមានគោលបំណងអ្វី?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              កម្មវិធីនេះជួយអ្នកប្រើប្រាស់ក្នុងការទទួលបានព័ត៌មានលឿន និងសេវាកម្មផ្សេងៗផ្ទាល់ពីក្នុង Telegram តែម្តង។
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-border">
            <AccordionTrigger className="text-sm font-medium hover:text-primary">តើទិន្នន័យរបស់ខ្ញុំសុវត្ថិភាពដែរឬទេ?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              បាទ/ចាស! យើងមិនរក្សាទុកទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកនៅលើម៉ាស៊ីនមេរបស់យើងទេ។ ព័ត៌មានទាំងអស់ដំណើរការតាមរយៈប្រព័ន្ធសុវត្ថិភាពរបស់ Telegram។
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-border">
            <AccordionTrigger className="text-sm font-medium hover:text-primary">តើអាចប្តូរពណ៌កម្មវិធីបានទេ?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              កម្មវិធីនេះនឹងផ្លាស់ប្តូរពណ៌ដោយស្វ័យប្រវត្តិទៅតាមការកំណត់ Telegram របស់អ្នក (ងងឹត ឬ ភ្លឺ) ឬអាចកំណត់ដោយផ្ទាល់ក្នុងទំព័រ "ការកំណត់"។
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="pt-2">
        <h2 className="text-lg font-bold font-serif mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent" />
          ទីតាំងរបស់យើង
        </h2>
        <Card className="overflow-hidden border-border">
          <div className="h-32 bg-muted flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[url('https://api.maptiler.com/maps/streets/256/0/0/0.png')] opacity-40 bg-cover bg-center mix-blend-luminosity"></div>
            <MapPin className="w-8 h-8 text-primary relative z-10" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-bold text-sm mb-1">រាជធានីភ្នំពេញ</h3>
            <p className="text-xs text-muted-foreground">ព្រះរាជាណាចក្រកម្ពុជា</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
