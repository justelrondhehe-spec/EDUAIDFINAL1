import { ArrowLeft, Globe, Clock, Calendar as CalendarIcon, DollarSign, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';

interface LanguageRegionProps {
  onBack: () => void;
}

export function LanguageRegion({ onBack }: LanguageRegionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-slate-800">Language & Region</h1>
          <p className="text-slate-600">Set your language and regional preferences</p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Language Settings */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800">Language Settings</h3>
              <p className="text-slate-600 text-sm">Choose your preferred language</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Display Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español (Spanish)</SelectItem>
                  <SelectItem value="fr">Français (French)</SelectItem>
                  <SelectItem value="de">Deutsch (German)</SelectItem>
                  <SelectItem value="zh">中文 (Chinese)</SelectItem>
                  <SelectItem value="ja">日本語 (Japanese)</SelectItem>
                  <SelectItem value="ko">한국어 (Korean)</SelectItem>
                  <SelectItem value="pt">Português (Portuguese)</SelectItem>
                  <SelectItem value="it">Italiano (Italian)</SelectItem>
                  <SelectItem value="ru">Русский (Russian)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Content Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-slate-500 text-sm">Language for lessons and activities</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="auto-translate">Auto-translate</Label>
                <p className="text-slate-500 text-sm">Automatically translate content to your language</p>
              </div>
              <Switch id="auto-translate" />
            </div>
          </div>
        </div>

        {/* Time & Date */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800">Time & Date Format</h3>
              <p className="text-slate-600 text-sm">Customize time and date display</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Time Zone</Label>
              <Select defaultValue="est">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">(GMT-8:00) Pacific Time</SelectItem>
                  <SelectItem value="mst">(GMT-7:00) Mountain Time</SelectItem>
                  <SelectItem value="cst">(GMT-6:00) Central Time</SelectItem>
                  <SelectItem value="est">(GMT-5:00) Eastern Time</SelectItem>
                  <SelectItem value="utc">(GMT+0:00) UTC</SelectItem>
                  <SelectItem value="cet">(GMT+1:00) Central European Time</SelectItem>
                  <SelectItem value="jst">(GMT+9:00) Japan Standard Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Time Format</Label>
              <Select defaultValue="12h">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12-hour (2:30 PM)</SelectItem>
                  <SelectItem value="24h">24-hour (14:30)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Date Format</Label>
              <Select defaultValue="mdy">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mdy">MM/DD/YYYY (11/02/2025)</SelectItem>
                  <SelectItem value="dmy">DD/MM/YYYY (02/11/2025)</SelectItem>
                  <SelectItem value="ymd">YYYY-MM-DD (2025-11-02)</SelectItem>
                  <SelectItem value="long">November 2, 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="auto-timezone">Auto-detect Time Zone</Label>
                <p className="text-slate-500 text-sm">Automatically set based on your location</p>
              </div>
              <Switch id="auto-timezone" defaultChecked />
            </div>
          </div>
        </div>

        {/* Regional Settings */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800">Regional Preferences</h3>
              <p className="text-slate-600 text-sm">Set regional formatting options</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Country/Region</Label>
              <Select defaultValue="us">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="es">Spain</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="cn">China</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>First Day of Week</Label>
              <Select defaultValue="sunday">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunday">Sunday</SelectItem>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="saturday">Saturday</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Currency
              </Label>
              <Select defaultValue="usd">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD - US Dollar ($)</SelectItem>
                  <SelectItem value="eur">EUR - Euro (€)</SelectItem>
                  <SelectItem value="gbp">GBP - British Pound (£)</SelectItem>
                  <SelectItem value="jpy">JPY - Japanese Yen (¥)</SelectItem>
                  <SelectItem value="cad">CAD - Canadian Dollar ($)</SelectItem>
                  <SelectItem value="aud">AUD - Australian Dollar ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Number Format</Label>
              <Select defaultValue="us">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">1,234.56</SelectItem>
                  <SelectItem value="eu">1.234,56</SelectItem>
                  <SelectItem value="space">1 234,56</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
