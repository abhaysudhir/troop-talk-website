import React, { useEffect, useState } from 'react';
import { useOrganization } from '@clerk/clerk-react';
import type { OrganizationMembershipResource } from '@clerk/types';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const { organization } = useOrganization();
  const [members, setMembers] = useState<OrganizationMembershipResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!organization) return;
      setLoading(true);
      setError(null);

      try {
        const memberships = await organization.getMemberships();
        console.log('Organization Members:', memberships);
        // Filter for members with role org:guest
        const guestMembers = memberships.data.filter(member => member.role === 'org:guest');
        setMembers(guestMembers);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch pending requests');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [organization]);

  const handleRequest = async (memberId: string, approved: boolean) => {
    if (!organization) return;

    try {
      // Get all memberships and find the specific one
      const memberships = await organization.getMemberships();
      const membership = memberships.data.find(m => m.id === memberId);
      
      if (!membership || !membership.publicUserData?.userId) {
        console.error('Could not find membership or user ID');
        return;
      }

      const userId = membership.publicUserData.userId;

      if (approved) {
        await organization.updateMember({ userId, role: 'org:member' });
      } else {
        await organization.removeMember(userId);
      }
      
      // Remove the member from the list
      setMembers(members.filter(member => member.id !== memberId));
    } catch (error) {
      console.error('Error handling request:', error);
      setError('Failed to process request');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Pending Join Requests</h1>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <p>Loading pending requests...</p>
      ) : members.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <div className="request-list">
          {members.map(member => (
            <div key={member.id} className="request-card">
              <div className="request-info">
                <h2>
                  {member.publicUserData?.firstName} {member.publicUserData?.lastName}
                </h2>
                <p className="email">{member.publicUserData?.identifier}</p>
              </div>
              <div className="request-actions">
                <button
                  className="accept-button"
                  onClick={() => handleRequest(member.id, true)}
                >
                  Accept
                </button>
                <button
                  className="deny-button"
                  onClick={() => handleRequest(member.id, false)}
                >
                  Deny
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
