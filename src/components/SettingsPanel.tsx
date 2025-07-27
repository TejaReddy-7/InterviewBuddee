import React, { useState } from 'react';
import { Save, Bell, Palette, Shield, User, Globe, Lock, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsPanel = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [formData, setFormData] = useState({
    companyName: 'InterviewBuddee',
    companyEmail: 'admin@interviewbuddee.com',
    timezone: 'UTC-05:00',
    language: 'English',
    notifications: true,
    emailAlerts: true,
    darkMode: true,
    autoSave: true,
    twoFactor: false,
    profileVisibility: 'team',
    interviewReminders: true,
    feedbackNotifications: true
  });
  
  const sections = [
    { id: 'general', label: 'General', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Globe }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the settings
    console.log('Settings saved:', formData);
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold">Settings</h2>
          <p className="text-gray-400 text-sm mt-1">Manage your account and application preferences</p>
        </div>
        
        <motion.button 
          className="flex items-center bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-4 py-2 rounded-lg font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </motion.button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white/5 rounded-xl border border-white/10 p-4">
            <ul className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <motion.li key={section.id}>
                    <motion.button
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all ${activeSection === section.id ? 'bg-yellow-500/20 text-yellow-400' : 'hover:bg-white/5'}`}
                      onClick={() => setActiveSection(section.id)}
                      whileHover={{ x: 5 }}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span>{section.label}</span>
                    </motion.button>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white/5 rounded-xl border border-white/10 p-6">
            {/* General Settings */}
            {activeSection === 'general' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold mb-6">General Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Email</label>
                    <input
                      type="email"
                      name="companyEmail"
                      value={formData.companyEmail}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Timezone</label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    >
                      <option value="UTC-08:00">Pacific Time (UTC-08:00)</option>
                      <option value="UTC-05:00">Eastern Time (UTC-05:00)</option>
                      <option value="UTC+00:00">London (UTC+00:00)</option>
                      <option value="UTC+01:00">Paris (UTC+01:00)</option>
                      <option value="UTC+05:30">Mumbai (UTC+05:30)</option>
                      <option value="UTC+09:00">Tokyo (UTC+09:00)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Japanese">Japanese</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium mb-4">Profile Visibility</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['team', 'company', 'public'].map((visibility) => (
                      <motion.label 
                        key={visibility}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${formData.profileVisibility === visibility ? 'border-yellow-400 bg-yellow-500/10' : 'border-white/10 hover:border-white/30'}`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <input
                          type="radio"
                          name="profileVisibility"
                          value={visibility}
                          checked={formData.profileVisibility === visibility}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="font-medium capitalize">{visibility}</div>
                        <div className="text-gray-400 text-sm mt-1">
                          {visibility === 'team' && 'Visible to team members only'}
                          {visibility === 'company' && 'Visible to all company members'}
                          {visibility === 'public' && 'Visible to everyone'}
                        </div>
                      </motion.label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Notifications */}
            {activeSection === 'notifications' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold mb-6">Notification Preferences</h3>
                
                <div className="space-y-4">
                  {[
                    { id: 'notifications', label: 'Enable Notifications', description: 'Receive notifications for important events' },
                    { id: 'emailAlerts', label: 'Email Alerts', description: 'Send email notifications for important updates' },
                    { id: 'interviewReminders', label: 'Interview Reminders', description: 'Send reminders before scheduled interviews' },
                    { id: 'feedbackNotifications', label: 'Feedback Notifications', description: 'Notify when feedback is submitted' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-gray-400 text-sm">{item.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name={item.id}
                          checked={formData[item.id as keyof typeof formData] as boolean}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Security */}
            {activeSection === 'security' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold mb-6">Security Settings</h3>
                
                <div className="space-y-6">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium flex items-center">
                          <Lock className="w-5 h-5 mr-2 text-yellow-400" />
                          Two-Factor Authentication
                        </div>
                        <div className="text-gray-400 text-sm mt-1">Add an extra layer of security to your account</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="twoFactor"
                          checked={formData.twoFactor}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="font-medium mb-3">Change Password</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 md:col-span-2"
                      />
                    </div>
                    <motion.button 
                      className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Update Password
                    </motion.button>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="font-medium mb-3">Active Sessions</div>
                    <div className="space-y-3">
                      {[
                        { device: 'Chrome on Windows', location: 'New York, US', time: 'Active now' },
                        { device: 'Safari on macOS', location: 'San Francisco, US', time: '2 hours ago' },
                        { device: 'Mobile App on iOS', location: 'London, UK', time: '1 day ago' }
                      ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                          <div>
                            <div className="font-medium flex items-center">
                              <Monitor className="w-4 h-4 mr-2 text-gray-400" />
                              {session.device}
                            </div>
                            <div className="text-gray-400 text-sm">{session.location} • {session.time}</div>
                          </div>
                          <motion.button 
                            className="text-sm text-red-400 hover:text-red-300 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Revoke
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Appearance */}
            {activeSection === 'appearance' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold mb-6">Appearance</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="font-medium mb-4">Theme</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'light', name: 'Light', preview: 'bg-gray-100 border-gray-300' },
                        { id: 'dark', name: 'Dark', preview: 'bg-gray-800 border-gray-600' },
                        { id: 'auto', name: 'System', preview: 'bg-gradient-to-r from-gray-100 to-gray-800 border-gray-500' }
                      ].map((theme) => (
                        <motion.label 
                          key={theme.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${formData.darkMode && theme.id === 'dark' ? 'border-yellow-400 ring-2 ring-yellow-400/30' : 'border-white/10 hover:border-white/30'}`}
                          whileHover={{ scale: 1.02 }}
                        >
                          <input
                            type="radio"
                            name="theme"
                            value={theme.id}
                            checked={formData.darkMode && theme.id === 'dark'}
                            onChange={() => setFormData({ ...formData, darkMode: theme.id === 'dark' })}
                            className="sr-only"
                          />
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-md border ${theme.preview} mr-3`}></div>
                            <div className="font-medium">{theme.name}</div>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-4">Preferences</div>
                    <div className="space-y-4">
                      {[
                        { id: 'autoSave', label: 'Auto-save Drafts', description: 'Automatically save interview notes as you type' }
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-gray-400 text-sm">{item.description}</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name={item.id}
                              checked={formData[item.id as keyof typeof formData] as boolean}
                              onChange={handleInputChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Integrations */}
            {activeSection === 'integrations' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold mb-6">Integrations</h3>
                
                <div className="space-y-4">
                  {[
                    { id: 'google-calendar', name: 'Google Calendar', description: 'Sync interviews with Google Calendar', connected: true },
                    { id: 'microsoft-teams', name: 'Microsoft Teams', description: 'Integrate with Microsoft Teams for meetings', connected: false },
                    { id: 'slack', name: 'Slack', description: 'Send notifications to Slack channels', connected: true },
                    { id: 'zoom', name: 'Zoom', description: 'Create Zoom meetings for interviews', connected: false }
                  ].map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                      <div>
                        <div className="font-medium">{integration.name}</div>
                        <div className="text-gray-400 text-sm">{integration.description}</div>
                      </div>
                      <motion.button 
                        className={`px-4 py-2 rounded-lg font-medium ${integration.connected ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 'bg-white/10 hover:bg-white/20'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {integration.connected ? 'Connected' : 'Connect'}
                      </motion.button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
