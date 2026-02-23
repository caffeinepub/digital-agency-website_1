import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useSubmitInquiry } from '../hooks/useQueries';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    companyName: '',
    websiteType: '',
    features: '',
    budget: '',
    deadline: '',
    additionalNotes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const submitInquiryMutation = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitInquiryMutation.mutateAsync(formData);
      
      setSubmitted(true);
      setFormData({
        fullName: '',
        emailAddress: '',
        phoneNumber: '',
        companyName: '',
        websiteType: '',
        features: '',
        budget: '',
        deadline: '',
        additionalNotes: '',
      });
      
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      websiteType: value,
    }));
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white">
            Get In <span className="text-coral">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to start your project? Let's discuss how we can help bring your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="h-12 transition-all duration-200 focus:ring-2 focus:ring-coral"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emailAddress">Email Address *</Label>
                      <Input
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        required
                        className="h-12 transition-all duration-200 focus:ring-2 focus:ring-coral"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number *</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="h-12 transition-all duration-200 focus:ring-2 focus:ring-coral"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company / Business Name *</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        placeholder="Your Company"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="h-12 transition-all duration-200 focus:ring-2 focus:ring-coral"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="websiteType">Website Type *</Label>
                      <Select value={formData.websiteType} onValueChange={handleSelectChange} required>
                        <SelectTrigger className="h-12 transition-all duration-200 focus:ring-2 focus:ring-coral">
                          <SelectValue placeholder="Select website type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Personal">Personal</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                          <SelectItem value="Portfolio">Portfolio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget *</Label>
                      <Input
                        id="budget"
                        name="budget"
                        placeholder="$5,000 - $10,000"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="h-12 transition-all duration-200 focus:ring-2 focus:ring-coral"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline *</Label>
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleChange}
                      required
                      className="h-12 transition-all duration-200 focus:ring-2 focus:ring-coral"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="features">Features / Requirements *</Label>
                    <Textarea
                      id="features"
                      name="features"
                      placeholder="Describe the features and requirements for your project..."
                      value={formData.features}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="resize-none transition-all duration-200 focus:ring-2 focus:ring-coral"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      placeholder="Any additional information you'd like to share..."
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      rows={4}
                      className="resize-none transition-all duration-200 focus:ring-2 focus:ring-coral"
                    />
                  </div>

                  {submitted && (
                    <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm">
                      Thank you! We've received your inquiry and will get back to you soon.
                    </div>
                  )}

                  {submitInquiryMutation.isError && (
                    <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm">
                      There was an error submitting your inquiry. Please try again.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={submitInquiryMutation.isPending}
                    className="w-full h-12 bg-coral hover:bg-coral-dark text-white font-semibold text-base transition-all duration-200"
                  >
                    {submitInquiryMutation.isPending ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Inquiry
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-xl">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-coral" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal dark:text-white mb-1">Email Us</h4>
                    <p className="text-sm text-muted-foreground">hello@digitalagency.com</p>
                    <p className="text-sm text-muted-foreground">support@digitalagency.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-coral" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal dark:text-white mb-1">Call Us</h4>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-coral" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal dark:text-white mb-1">Visit Us</h4>
                    <p className="text-sm text-muted-foreground">123 Digital Street</p>
                    <p className="text-sm text-muted-foreground">San Francisco, CA 94102</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl bg-gradient-to-br from-coral to-coral-dark text-white">
              <CardContent className="p-6">
                <h4 className="font-bold text-xl mb-2">Ready to Start?</h4>
                <p className="text-sm text-white/90 mb-4">
                  Let's schedule a free consultation to discuss your project and explore how we can help you succeed.
                </p>
                <Button variant="secondary" className="w-full">
                  Schedule a Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
