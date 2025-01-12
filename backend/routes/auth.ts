import express from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';

const router = express.Router();

router.post('/api/create-org-invitation', async (req, res) => {
  const { userId } = req.body;
  
  try {
    const user = await clerkClient.users.getUser(userId);
    
    const invitation = await clerkClient.organizations.createOrganizationInvitation({
      organizationId: process.env.CLERK_ORGANIZATION_ID!,
      emailAddress: user.primaryEmailAddress?.emailAddress || '',
      role: 'basic_member',
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error creating invitation:', error);
    res.status(500).json({ error: 'Failed to create invitation' });
  }
});

export default router; 